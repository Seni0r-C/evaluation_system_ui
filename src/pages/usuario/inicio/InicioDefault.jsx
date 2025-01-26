// import AdminRutas from "../Admin/AdminRutas";

const InicioDefault = () => {
    return (
        <div className="p-6 space-y-6">
            {/* Título de bienvenida */}
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800">¡Bienvenido al Sistema de Calificación!</h1>
                <p className="text-gray-600 mt-2">Si estás viendo esto significa que no tienes una vista personalizada para tu rol asignado, contacta con el administrador si crees que se trata de un error.</p>
                {/* <AdminRutas /> */}
            </div>
        </div>
    );
};

export default InicioDefault;
