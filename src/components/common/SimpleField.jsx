const SimpleField = ({ label, value }) => {
    return (
        <div className="mb-4">
            <label className="block mb-2 font-medium">{label}</label>
            <input
                type="text"
                value={value || ""}
                readOnly
                className="w-full p-2 border rounded"
            />
        </div>
    );
};

export default SimpleField;
