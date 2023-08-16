import React, { Component } from "react";
import redirect from "@helpers/redirect";
import { getCookie, getLocalStorage } from "@helpers/session";
import { toQueryString } from "@helpers/util";
import { initQuery } from "@helpers/global";

export default (ComposedComponent, roleWiseRedirect) =>
  class WithData extends Component {
    static async getInitialProps(context) {
      const hasAccessToken = getCookie("accesstoken", context.req);
      const pathname = context?.req?.headers["x-invoke-path"] ?? "";
      console.log("from get initial props pathname", pathname);
      console.log(hasAccessToken);
      // with auth
      // if (pathname?.toString() === "/" && hasAccessToken) {
      //   redirect("/record", context);
      // }
      if (pathname?.toString() === "/") {
        redirect("/record" + toQueryString(initQuery), context);
      }
      return { hasAccessToken };
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  };
