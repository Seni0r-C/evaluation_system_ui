import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import PropTypes from 'prop-types';

const LoginForm = ({ usuario, setUsuario, password, setPassword, showPassword, toggleShowPassword, handleSubmit }) => (
    <form onSubmit={handleSubmit} className="text-white">
        <div className="mb-4">
            <label htmlFor="usuario" className="block font-medium mb-2 text-white">Usuario</label>
            <input
                type="text"
                id="usuario"
                placeholder="No es necesario el ''@utm.edu.ec''"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="w-full px-4 py-2 border border-transparent bg-opacity-70 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 text-black placeholder-gray-600"
                required
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        document.getElementById("password").focus();
                    }
                }}
            />
        </div>
        <div className="mb-6">
            <label htmlFor="password" className="block font-medium mb-2 text-white">Contraseña</label>
            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Ingrese su contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 pr-12 border border-transparent bg-opacity-70 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 text-black placeholder-gray-600"
                    required
                />
                <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-800 hover:text-black"
                >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
            </div>
        </div>
        <button
            type="submit"
            className="w-full bg-[#f8cf12] text-[#4c4c4a] py-3 font-medium rounded hover:bg-[#f7d22d] transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-400"
        >
            Iniciar Sesión
        </button>
    </form>
);

LoginForm.propTypes = {
    usuario: PropTypes.string.isRequired,
    setUsuario: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    setPassword: PropTypes.func.isRequired,
    showPassword: PropTypes.bool.isRequired,
    toggleShowPassword: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

export default LoginForm;