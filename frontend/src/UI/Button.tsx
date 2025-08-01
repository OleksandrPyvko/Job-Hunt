
type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  form?: string;
};

export default function Button({ onClick, className, children, form,  type = "button", disabled = false }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={className}
      type={type}
      disabled={disabled}
      form={form}
    >
      {children}
    </button>
  );
}
