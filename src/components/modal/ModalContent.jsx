import ArrayTable from "../common/dynamic/ArrayTable";
import NestedObjectViewer from "./NestedObjectViewer";
import SimpleField from "../common/SimpleField";

const ModalContent = ({ data, nestedData, onViewNestedData }) => {
    const renderField = (key, value) => {
        if (Array.isArray(value)) {
            return <ArrayTable key={key} label={key} data={value} />;
        } else if (typeof value === "object" && value !== null) {
            return (
                <NestedObjectViewer
                    key={key}
                    label={key}
                    onViewDetails={() => onViewNestedData(value)}
                />
            );
        } else {
            return <SimpleField key={key} label={key} value={value} />;
        }
    };

    const currentData = nestedData || data || [];

    return (
        <div className="p-6 space-y-4 overflow-y-auto max-h-[70vh]">
            {Object.entries(currentData).map(([key, value]) => renderField(key, value))}
        </div>
    );
};

export default ModalContent;
