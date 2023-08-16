import useDebouncedValue from "../../hooks/useDebouncedValue";
import { Input, Tooltip } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DebounceInput = ({
  syncWithRouter = false,
  routingProperty,
  defaultValue,
  value,
  placeholder = "Type here",
  onChange,
  disabled = false,
  type = "string",
  ...props
}) => {
  const router = useRouter();
  const [newValue, setNewValue] = useState(
    syncWithRouter && routingProperty
      ? router.query[routingProperty]
      : defaultValue
  );
  const debounceFN = useDebouncedValue(newValue, 1000);

  useEffect(() => {
    onChange(newValue);
  }, [debounceFN]);

  useEffect(() => {
    if (value !== newValue) {
      setNewValue(value);
    }
  }, [value]);

  useEffect(() => {
    if (syncWithRouter && routingProperty) {
      setNewValue(router.query[routingProperty]);
    }
  }, [router.query[routingProperty]]);

  return (
    <Tooltip title={placeholder}>
      <Input
        disabled={disabled}
        value={newValue ?? undefined}
        style={{ width: "100%" }}
        type={type}
        onChange={(e) => {
          setNewValue(e?.target?.value ?? null);
        }}
        allowClear
        placeholder={placeholder}
        {...props}
      />
    </Tooltip>
  );
};

export default DebounceInput;
