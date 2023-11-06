import { Eye, EyeSlash, Key } from "@phosphor-icons/react";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormType } from "../../types/form";
import { formatCurrencyValue } from "../../helper/currency";

type Props = FormType;

export const FormInput = ({
  label,
  name,
  type,
  className,
  placeholder,
  required = false,
  control,
  error,
  onChange,
  defaultValue,
  value,
  disabled,
  hint,
}: Props) => {
  return (
    <div className="mb-3">
      <label className="block text-sm mb-1 text-gray-700">
        {label} {required ? <span className="text-red-600">*</span> : ""}
      </label>
      {control ? (
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => (
            <input
              {...field}
              type={type ?? "text"}
              className={`block w-full rounded-lg border border-gray-300 p-2 ${
                error ? "border-red-600" : "border-gray-300"
              } ${className} ${
                disabled && "cursor-not-allowed bg-gray-100 text-gray-600"
              }`}
              placeholder={placeholder ?? ""}
              required={required}
              disabled={disabled}
              onChange={(e) => {
                field.onChange(e);
                onChange?.(e);
              }}
            />
          )}
        />
      ) : (
        <input
          type={type ?? "text"}
          name={name} // Add name for uncontrolled inputs
          className={`block w-full rounded-lg border border-gray-300 p-2 ${
            error ? "border-red-600" : "border-gray-300"
          } ${disabled && "cursor-not-allowed bg-gray-100"} ${className}`}
          placeholder={placeholder ?? ""}
          required={required}
          onChange={onChange}
          defaultValue={defaultValue}
          value={value}
          disabled={disabled}
        />
      )}
      {hint && (
        <>
          <small className="text-xs text-gray-600">{hint}</small> <br />
        </>
      )}
      {error && (
        <>
          <small className="text-xs text-red-600">{error}</small>
        </>
      )}
    </div>
  );
};

export const FormInputGroupRight = ({
  label,
  name,
  type,
  className,
  placeholder,
  onInput,
  onChange,
  required = false,
  register,
  value,
  defaultValue,
  disabled = false,
  control,
  icon,
  error,
}: Props) => {
  return (
    <div className="mb-3">
      <label className="block text-sm mb-1 text-gray-700">
        {label} {required ? <span className="text-red-600">*</span> : ""}
      </label>
      {control ? (
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => (
            <div className="w-full relative">
              <input
                {...field}
                type={type ?? "text"}
                className={`
                  block w-full rounded-lg border border-gray-300 p-2
										${error ? "border-red-600" : "border-gray-300"} 
										${className}
										${disabled && "cursor-not-allowed bg-gray-100 text-gray-600"}
									`}
                placeholder={placeholder ?? ""}
                required={required}
                disabled={disabled}
                defaultValue={defaultValue}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                {icon}
              </div>
            </div>
          )}
        />
      ) : (
        <div className="w-full relative">
          <input
            type={type ?? "text"}
            className={`
              block w-full rounded-lg border border-gray-300 p-2
								${error ? "border-red-600" : "border-gray-300"} 
								${className}
								${disabled && "cursor-not-allowed bg-gray-100 text-gray-600"}
							`}
            placeholder={placeholder ?? ""}
            required={required}
            disabled={disabled}
            defaultValue={defaultValue}
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            {icon}
          </div>
        </div>
      )}
      {error && <small className="text-xs text-red-600">{error}</small>}
    </div>
  );
};

export const FormInputGroupLeft = ({
  label,
  name,
  type,
  className,
  placeholder,
  icon,
  onInput,
  onChange,
  required = false,
  register,
  defaultValue,
  disabled = false,
  error,
  control,
  autofocus,
}: Props) => {
  return (
    <div className="mb-3">
      <label htmlFor={label} className="block mb-1 text-sm text-gray-700">
        {label} {required ? <span className="text-red-600">*</span> : ""}
      </label>
      <div className="w-full relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-700 text-2xl">{icon}</span>
        </div>
        <input
          {...(register ? { ...register(name) } : null)}
          type={type ?? "text"}
          name={name}
          id={label}
          className={`
            block w-full rounded-lg border border-gray-300 pl-11 
            ${error ? "border-red-600" : "border-gray-300"} 
            ${disabled && "cursor-not-allowed bg-gray-100 text-gray-600"}
            ${className}
          `}
          placeholder={placeholder ?? ""}
          required={required}
          defaultValue={defaultValue}
          disabled={disabled}
          onChange={onChange}
          autoFocus={autofocus}
        />
      </div>
      {error && <small className="text-xs text-red-600">{error}</small>}
    </div>
  );
};

export const FormInputPassword = ({
  label,
  name,
  className,
  placeholder,
  register,
  onInput,
  onChange,
  required,
  defaultValue,
  control,
  onKeyPress,
  error,
}: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="mb-3">
      <label htmlFor={label} className="block mb-1 text-sm text-gray-700">
        {label} {required ? <span className="text-red-600">*</span> : ""}
      </label>
      {control ? (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <div className="w-full relative">
              <input
                {...field}
                type={showPassword ? "text" : "password"}
                name={name}
                onInput={onInput}
                id={label}
                className={`block w-full rounded-lg pl-2 pr-11 border py-2 ${
                  error ? "border-red-600" : "border-gray-300"
                }  ${className}`}
                placeholder={placeholder ?? ""}
                required={required}
                defaultValue={defaultValue}
                onKeyPress={onKeyPress}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-gray-700 text-2xl">
                  {showPassword ? (
                    <div
                      className="cursor-pointer hover:text-gray-600"
                      onClick={() => setShowPassword(false)}
                    >
                      <Eye />
                    </div>
                  ) : (
                    <div
                      className="cursor-pointer hover:text-gray-600"
                      onClick={() => setShowPassword(true)}
                    >
                      <EyeSlash />
                    </div>
                  )}
                </span>
              </div>
            </div>
          )}
        />
      ) : (
        <div className="w-full relative">
          <input
            {...(register ? { ...register(name) } : null)}
            type={showPassword ? "text" : "password"}
            name={name}
            onInput={onInput}
            id={label}
            className={`block w-full rounded-lg pl-2 pr-11 border py-2 border-gray-300 ${className}`}
            placeholder={placeholder ?? ""}
            required={required}
            defaultValue={defaultValue}
            onKeyPress={onKeyPress}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <span className="text-gray-700 text-2xl">
              {showPassword ? (
                <div
                  className="cursor-pointer hover:text-gray-600"
                  onClick={() => setShowPassword(false)}
                >
                  <Eye />
                </div>
              ) : (
                <div
                  className="cursor-pointer hover:text-gray-600"
                  onClick={() => setShowPassword(true)}
                >
                  <EyeSlash />
                </div>
              )}
            </span>
          </div>
        </div>
      )}
      {error && <small className="text-xs text-red-600">{error}</small>}
    </div>
  );
};

export const FormInputCurrency = ({
  label,
  name,
  className,
  placeholder,
  onInput,
  onChange,
  required = false,
  register,
  defaultValue,
  disabled = false,
  error,
  control,
}: Props) => {
  const { getValues } = useFormContext();
  const [val, setVal] = useState<string | number>(
    (getValues(name)
      ? parseFloat(getValues(name)).toLocaleString("id-ID")
      : 0) ??
      defaultValue ??
      0
  );

  const handleInput = (input: string) => {
    let parseInput = formatCurrencyValue(input);
    if (input === "") setVal(0);
    else {
      let value = parseFloat(parseInput).toLocaleString("id-ID");
      setVal(value);
    }
  };

  return (
    <div className="mb-3">
      <label htmlFor={label} className="block mb-1 text-sm text-gray-700">
        {label}
        {required ? <span className="text-red-600">*</span> : ""}
      </label>
      <div className="w-full relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-700 text-2xl">
            <span className="text-base flex items-center text-gray-600">
              Rp
            </span>
          </span>
        </div>
        {control ? (
          <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                id={label}
                className={`
                  block w-full rounded-lg pl-11 
                  ${error ? "border-red-600" : "border-gray-300"} 
                  ${disabled && "cursor-not-allowed bg-gray-100 text-gray-600"}
                  ${className}
                `}
                placeholder={placeholder ?? ""}
                required={required}
                disabled={disabled}
                value={val}
                onChange={(e) => {
                  handleInput(e.target.value);
                  field.onChange(e.target.value.replace(/\./g, ""));
                  onChange?.(e);
                }}
              />
            )}
          />
        ) : (
          <input
            type="text"
            id={label}
            className={`
            block w-full rounded-lg pl-11 
            ${error ? "border-red-600" : "border-gray-300"} 
            ${disabled && "cursor-not-allowed bg-gray-100 text-gray-600"}
            ${className}
          `}
            placeholder={placeholder ?? ""}
            required={required}
            disabled={disabled}
            value={val}
            onChange={(e) => {
              handleInput(e.target.value);
              onChange?.(e);
            }}
          />
        )}
      </div>
      {error && <small className="text-xs text-red-600">{error}</small>}
    </div>
  );
};
