
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BuscadorUsuariosUTMModal from '../utmodal/BuscadorUsuariosUTMModal';
import { getRoles } from '../../services/rolesService';
import { obtenerCarreras } from '../../services/carreraService';
import { useMessage } from '../../hooks/useMessage';
import axiosInstance from '../../services/axiosConfig';

const BuscadorUsuariosUTM = ({ initialSearchTerm, onUserAdded, onClose }) => {
    const [modalIsOpen, setModalIsOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [carreras, setCarreras] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedRol, setSelectedRol] = useState('');
    const [selectedCarrera, setSelectedCarrera] = useState('');
    const { showMsg, showQuestion } = useMessage();

    useEffect(() => {
        getRoles().then(setRoles);
        obtenerCarreras(setCarreras);
    }, []);

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const handleSelectUser = (user) => {
        setSelectedUser(user);
    };

    const handleAddUser = async () => {
        if (!selectedUser) {
            showMsg({ typeMsg: 'warning', message: 'Debe seleccionar un usuario.' });
            return;
        }
        if (!selectedRol) {
            showMsg({ typeMsg: 'warning', message: 'Debe seleccionar un rol.' });
            return;
        }
        if (!selectedCarrera) {
            showMsg({ typeMsg: 'warning', message: 'Debe seleccionar una carrera.' });
            return;
        }

        const action = async () => {
            try {
                showMsg({ typeMsg: 'wait', message: 'Agregando usuario...' });
                const response = await axiosInstance.post('/usuarios/crear-desde-utm', {
                    usuario: selectedUser,
                    rol_id: selectedRol,
                    carrera_id: selectedCarrera,
                });
                showMsg({ typeMsg: 'success', message: 'Usuario agregado correctamente.' });
                if (onUserAdded) {
                    onUserAdded(response.data);
                }
                closeModal();
            } catch (error) {
                showMsg({ typeMsg: 'error', message: 'Error al agregar el usuario.' });
                console.error('Error al agregar usuario:', error);
            }
        };

        showQuestion('¿Está seguro de que desea agregar este usuario?', action);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        if (onClose) {
            onClose();
        }
    };

    return (
        <BuscadorUsuariosUTMModal
            isOpen={modalIsOpen}
            onClose={closeModal}
            searchTerm={searchTerm}
            onSearch={handleSearch}
            users={users}
            onSelectUser={handleSelectUser}
            selectedUser={selectedUser}
            roles={roles}
            carreras={carreras}
            selectedRol={selectedRol}
            setSelectedRol={setSelectedRol}
            selectedCarrera={selectedCarrera}
            setSelectedCarrera={setSelectedCarrera}
            onAddUser={handleAddUser}
            setUsers={setUsers}
        />
    );
};

BuscadorUsuariosUTM.propTypes = {
    initialSearchTerm: PropTypes.string,
    onUserAdded: PropTypes.func,
    onClose: PropTypes.func.isRequired,
};

export default BuscadorUsuariosUTM;
