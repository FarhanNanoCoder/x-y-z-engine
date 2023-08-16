import { defaultRedirectedValues, initQuery } from "@helpers/global";

export const getTextFromHtml = (html) => {
  let plainString = html.replace(/<[^>]+>/g, "");
  return plainString;
};

export const toQueryString = (object) => {
  if (!object) {
    return "";
  } else {
    object = Object.entries(object).reduce(
      (a, [k, v]) => (v == null || v === "" || v === " " ? a : ((a[k] = v), a)),
      {}
    );
    return (
      "?" +
      Object.keys(object)
        .map((key) => `${key}=${object[key]?.toString()}`)
        .join("&")
    );
  }
};

export const processObject = (obj, keys, { isFormdata = false } = {}) => {
  if (isFormdata) {
    const formData = new FormData();
    for (const key of keys) {
      if (obj[key] || obj[key] == false || obj[key] == 0)
        formData.append(key, obj[key]);
    }
    return formData;
  }

  const result = {};
  for (const key of keys) {
    if (obj[key] || obj[key] == false || obj[key] == 0) result[key] = obj[key];
  }
  return result;
};

export const handleStringToBool = (value) => {
  switch (value) {
    case "true":
      return true;
      break;
    case "false":
      return false;
      break;

    default:
      return undefined;
      break;
  }
};

export const isSameObject = ({ obj1, obj2 }) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

export const hasMoreThanQuery = ({ query = {}, base = initQuery }) => {
  // console.log({ query, base });
  var count = 0;
  for (const [key, value] of Object.entries(base)) {
    query.hasOwnProperty(key) && count++;
  }
  if (query["redirected_from"] && query["redirected_with"]) {
    return Object.keys(query).length > count - 2; //bcz 2 extra fields for navigation routing
  } else {
    return Object.keys(query).length > count;
  }
};
export const extraKeysAfterComparing = ({ obj1, obj2, forRouting = true }) => {
  if (forRouting && obj1["redirected_from"] && obj1["redirected_with"]) {
    var count = 0;
    for (let [key, value] of Object.entries(defaultRedirectedValues)) {
      obj1.hasOwnProperty(key) && count++;
    }
    return Object.keys(obj1).length - Object.keys(obj2).length - count ?? 0;
  } else {
    return Object.keys(obj1).length - Object.keys(obj2).length ?? 0;
  }
};

export const getRedirectQuery = ({ from, withField }) => {
  return toQueryString({
    redirected_from: from,
    redirected_with: withField,
  });
};

export const getParsedObject = ({ origin, split = ";", innerSplit = ":" }) => {
  const arrayOfFields = origin?.split(split) ?? [];
  var object = {};

  arrayOfFields?.forEach((field) => {
    let temp = field?.split(innerSplit) ?? [];
    // let  temp=[];
    if (temp.length === 2) {
      object = {
        ...object,
        [temp[0]]: temp[1],
      };
    }
  });

  return object;
};

export const generateStringFromObjct = ({
  obj,
  split = ";",
  innerSplit = ":",
}) => {
  var str = "";
  for (let [key, value] of Object.entries(obj)) {
    str += `${key}${innerSplit}${value?.toString()}${split}`;
  }

  if (str.length <= 2) {
    str = "";
  } else {
    str = str.substring(0, str.length - 1);
  }

  return str;
};

export const handleSortQuery = ({ sort_by, router, base = "/" }) => {
  if (router && base && sort_by) {
    let sort_order;
    var key = sort_by;
    console.log("sort_by", key);
    if (sort_by === (router.query.sort_by ?? "")) {
      //already exists
      switch (router.query.sort_order) {
        case "asc":
          sort_order = "desc";
          break;
        case "desc":
          sort_order = "";
          key = "";
          break;
        default:
          sort_order = "asc";
          break;
      }
    } else {
      sort_order = "asc";
    }
    console.log("sort_by", key);
    router.replace(
      base +
        toQueryString({
          ...router.query,
          sort_by: key,
          sort_order: sort_order,
        })
    );
  }
};

export const responseTransformer = ({ res, key }) => {
  if (res?.code >= 400) {
    return {
      error: {
        ...res,
        data: {
          ...res?.data,
          meta: {
            total: res?.data?.meta?.total ?? 0,
            count: res?.data?.meta?.page_size ?? 0,
            results: res?.data?.results ? res?.data?.results.length : 0,
            current:
              res?.data?.meta?.next === null
                ? res?.data?.meta?.previous && res?.data?.meta?.page_size
                  ? res?.data?.meta?.previous + 1
                  : 1
                : res?.data?.meta?.next
                ? res?.data?.meta?.next - 1
                : 1,
            next: res?.data?.meta?.next ?? null,
            last_page:
              res?.data?.meta?.total !== 0 && res?.data?.meta?.page_size !== 0
                ? Math.floor(
                    (res?.data?.meta?.total ?? 1) /
                      (res?.data?.meta?.page_size ?? 1)
                  ) +
                  ((res?.data?.meta?.total ?? 1) %
                    (res?.data?.meta?.page_size ?? 1) !==
                  0
                    ? 1
                    : 0)
                : null,
            previous: res?.data?.meta?.previous ?? null,
          },
        },
      },
      data: null,
    };
  } else {
    return {
      data: {
        ...res,
        data: {
          ...res?.data,
          meta: {
            total: res?.data?.meta?.total ?? 0,
            count: res?.data?.meta?.page_size ?? 0,
            results: res?.data?.results ? res?.data?.results.length : 0,
            current:
              res?.data?.meta?.next === null
                ? res?.data?.meta?.previous && res?.data?.meta?.page_size
                  ? res?.data?.meta?.previous + 1
                  : 1
                : res?.data?.meta?.next
                ? res?.data?.meta?.next - 1
                : 1,
            next: res?.data?.meta?.next ?? null,
            last_page:
              res?.data?.meta?.total !== 0 && res?.data?.meta?.page_size !== 0
                ? Math.floor(
                    (res?.data?.meta?.total ?? 1) /
                      (res?.data?.meta?.page_size ?? 1)
                  ) +
                  ((res?.data?.meta?.total ?? 1) %
                    (res?.data?.meta?.page_size ?? 1) !==
                  0
                    ? 1
                    : 0)
                : null,
            previous: res?.data?.meta?.previous ?? null,
          },
        },
      },
      error: null,
    };
  }
};
