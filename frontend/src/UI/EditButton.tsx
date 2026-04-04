type ButtonProps = {
    onClick?: () => void;
    children?: React.ReactNode;
}

function EditButton() {
    return (
        <button className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-400">
         Edit
        </button>
    )
}

export default EditButton
