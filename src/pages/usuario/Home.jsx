/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChalkboardTeacher, FaUserShield, FaBook, FaFileSignature, FaUsersCog } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import UserContext from '../../context/UserContext';
import axiosInstance from '../../services/axiosConfig';
import { baseRoute } from '../../utils/constants';

const ActionCard = ({ to, icon, title, description }) => (
    <Link to={baseRoute + to} className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center hover:bg-gray-100 transition-colors duration-300">
        <div className="text-4xl text-blue-500 mb-4">{icon}</div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
    </Link>
);

const Home = () => {
    const { hasRole, userName } = useContext(UserContext);
    const [dashboardData, setDashboardData] = useState(null);

    useEffect(() => {
        if (hasRole(["DECANATO", "VICEDECANATO", "ADMINISTRACIÓN", "SECRETARíA"])) {
            axiosInstance.get('/reportes/dashboard-summary').then(response => {
                setDashboardData(response.data);
            });
        }
    }, [hasRole]);

    const renderAdminContent = () => (
        <>
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-800">Bienvenido, {userName}</h1>
                <p className="text-gray-600 mt-2">Gestiona y supervisa el sistema de evaluación.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ActionCard to="admin/user-permissions" icon={<FaUsersCog />} title="Gestionar Permisos" description="Asigna roles y permisos a los usuarios del sistema." />
                <ActionCard to="items-rubrica" icon={<FaFileSignature />} title="Configurar Rúbricas" description="Define los criterios de evaluación para los trabajos." />
                <ActionCard to="carreras" icon={<FaBook />} title="Administrar Carreras" description="Gestiona las carreras y modalidades de titulación." />
            </div>
        </>
    );

    const renderDocenteContent = () => (
        <>
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-800">Bienvenido, {userName}</h1>
                <p className="text-gray-600 mt-2">Revisa y califica los trabajos de titulación asignados.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ActionCard to="calificacion-de-trabajo-titulacion" icon={<FaChalkboardTeacher />} title="Tesis por Calificar" description="Accede a la lista de trabajos pendientes de calificación." />
                <ActionCard to="registro-anteproyecto" icon={<FaFileSignature />} title="Registrar Anteproyecto" description="Inicia un nuevo proceso de titulación." />
            </div>
        </>
    );

    const renderEstudianteContent = () => (
        <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800">¡Bienvenido, {userName}!</h1>
            <p className="text-gray-600 mt-4">Has sido registrado en el Sistema de Evaluación de Titulación.</p>
            <p className="text-gray-600 mt-2">Tu tutor y tribunal podrán ahora gestionar tu proceso.</p>
            <div className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">El Proceso de Titulación</h2>
                <div className="relative">
                    <div className="border-l-2 border-blue-500 absolute h-full left-1/2 -translate-x-1/2"></div>
                    <div className="space-y-8">
                        <div className="flex items-center w-full">
                            <div className="w-1/2 flex justify-end pr-8">
                                <div className="bg-green-500 text-white p-4 rounded-full shadow-lg">
                                    <FaUserShield size={30} />
                                </div>
                            </div>
                            <div className="w-1/2 pl-8">
                                <h3 className="font-semibold text-lg">1. Registro en el Sistema</h3>
                                <p className="text-gray-600">¡Completado!</p>
                            </div>
                        </div>
                        <div className="flex items-center w-full">
                            <div className="w-1/2 flex justify-end pr-8">
                                <div className="bg-gray-300 text-gray-600 p-4 rounded-full shadow-lg">
                                    <FaFileSignature size={30} />
                                </div>
                            </div>
                            <div className="w-1/2 pl-8">
                                <h3 className="font-semibold text-lg">2. Registro de Anteproyecto</h3>
                                <p className="text-gray-600">Tu tutor se encargará de este paso.</p>
                            </div>
                        </div>
                        <div className="flex items-center w-full">
                            <div className="w-1/2 flex justify-end pr-8">
                                <div className="bg-gray-300 text-gray-600 p-4 rounded-full shadow-lg">
                                    <FaUsersCog size={30} />
                                </div>
                            </div>
                            <div className="w-1/2 pl-8">
                                <h3 className="font-semibold text-lg">3. Asignación de Tribunal</h3>
                                <p className="text-gray-600">El decanato asignará tu tribunal.</p>
                            </div>
                        </div>
                        <div className="flex items-center w-full">
                            <div className="w-1/2 flex justify-end pr-8">
                                <div className="bg-gray-300 text-gray-600 p-4 rounded-full shadow-lg">
                                    <FaBook size={30} />
                                </div>
                            </div>
                            <div className="w-1/2 pl-8">
                                <h3 className="font-semibold text-lg">4. Calificación y Defensa</h3>
                                <p className="text-gray-600">Presentarás tu trabajo ante el tribunal.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8 text-center bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-700">Por ahora, no necesitas realizar ninguna otra acción en el sistema. ¡Mucho éxito en tu trabajo de titulación!</p>
            </div>
        </div>
    );

    const renderDecanatoContent = () => {
        if (!dashboardData) {
            return <div>Cargando...</div>;
        }

        const { estadoGeneral, distribucionModalidad, graduadosPorMes, cargaTutores } = dashboardData;

        const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

        return (
            <>
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800">Dashboard del Decanato</h1>
                    <p className="text-gray-600 mt-2">Métricas clave del proceso de titulación.</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="font-semibold mb-4">Estado General de Trabajos</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={estadoGeneral} dataKey="total" nameKey="nombre" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                                    {estadoGeneral.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="font-semibold mb-4">Distribución por Modalidad</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={distribucionModalidad}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="nombre" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="total" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg col-span-1 lg:col-span-2">
                        <h3 className="font-semibold mb-4">Graduados por Mes (Año Actual)</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={graduadosPorMes}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="mes" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="total" stroke="#8884d8" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg col-span-1 lg:col-span-2">
                        <h3 className="font-semibold mb-4">Carga de Tutores</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr>
                                        <th className="py-2">Tutor</th>
                                        <th className="py-2">Trabajos Asignados</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cargaTutores.map((tutor, index) => (
                                        <tr key={index} className="text-center">
                                            <td className="py-2">{tutor.tutor}</td>
                                            <td className="py-2">{tutor.total}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    const renderContent = () => {
        if (hasRole(["ADMINISTRACIÓN"])) {
            return <>
                {renderAdminContent()}
                {renderDecanatoContent()}
            </>
        }
        if (hasRole(["DECANATO", "VICEDECANATO", "SECRETARíA"])) {
            return renderDecanatoContent();
        }
        if (hasRole(["DOCENTE"])) {
            return renderDocenteContent();
        }
        if (hasRole(["ESTUDIANTE"])) {
            return renderEstudianteContent();
        }
        return <div>Cargando...</div>;
    };

    return (
        <div className="p-6 space-y-6">
            {renderContent()}
        </div>
    );
};

export default Home;
