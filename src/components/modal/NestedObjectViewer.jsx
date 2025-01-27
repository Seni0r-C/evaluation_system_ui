import PropTypes from "prop-types";

const NestedObjectViewer = ({ label, onViewDetails }) => {
    return (
        <div className="mb-4">
            <label className="block mb-2 font-medium">{label}</label>
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={onViewDetails}
            >
                Ver detalle
            </button>
        </div>
    );
};

NestedObjectViewer.propTypes = {
    label: PropTypes.string.isRequired,
    onViewDetails: PropTypes.func.isRequired,
};

export default NestedObjectViewer;
