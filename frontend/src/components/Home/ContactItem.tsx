type ContactItemProps = {
  icon: React.ReactNode;
  title: string;
  label: string;
  value: string;
  type?: "tel" | "mailto";
};

function ContactItem({ icon, title, label, value, type }: ContactItemProps) {
  return (
    <div className="flex flex-col gap-3 py-4">
      <div>{icon}</div>

      <div className="space-y-2 text-sm ">
        <p className="font-medium text-black dark:text-slate-100">{title}</p>
        <p className="">{label}</p>
        <a
          href={`${type}:${value}`}
          className="text-sm text-blue-700 underline underline-offset-2 dark:text-blue-400"
        >
          {value}
        </a>
      </div>
    </div>
  );
}

export default ContactItem;
//
