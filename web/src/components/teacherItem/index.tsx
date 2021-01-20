import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import api from '../../services/api';

import './styles.css';

export interface Teacher {
    avatar: string,
    bio: string,
    cost: number,
    id: number,
    name: string,
    subject: string,
    whatsapp: string
}

interface TeacherItemProps {
    teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
    function createNewConnection() {
        api.post('connections',{
            user_id: teacher.id
        });
    }

    return (
        <article className="teacher-item">
            <header>
                <img src={teacher.avatar} alt={teacher.name} />
                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>

            <p>{teacher.bio}</p>

            <footer>
                <p>Preço/Hora <strong>R$ {teacher.cost}</strong></p>
                    <a onClick={createNewConnection} href={`https://api.whatsapp.com/send?l=pt_BR&phone=55${teacher.whatsapp}
                            &text=Tenho interesse na sua aula de ${teacher.subject} ${teacher.name}`}
                    className="button"
                    target="_blank">
                    <img src={whatsappIcon} alt="Whatsapp" />Entrar em contato
                </a>
            </footer>
        </article>
    )
}

export default TeacherItem;