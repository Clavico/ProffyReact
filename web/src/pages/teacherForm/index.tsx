import React, { FormEvent, useState } from 'react';
import {useHistory} from 'react-router-dom';

import Input from '../../components/input';
import PageHeader from '../../components/pageHeader';
import TextArea from '../../components/textArea';
import Select from '../../components/select';

import './styles.css';
import warningIcon from '../../assets/images/icons/warning.svg';
import api from '../../services/api';



function TeacherForm() {
    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [scheduleItems, setscheduleItems] = useState([
        { week_day: 0, from: '', to: '' }
    ]);

    function addNewScheduleItem() {
        setscheduleItems([
            ...scheduleItems,
            { week_day: 0, from: '', to: '' }
        ])
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value }
            }
            return scheduleItem;
        });

        setscheduleItems(updatedScheduleItems);
    }

    function handleCreateClass(e: FormEvent) {
        e.preventDefault();

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule: scheduleItems
        }).then(() => {
            alert('Cadastro realizado com sucesso');
            history.push('/');
        }).catch(()=>{
            alert('Erro no cadastro!');
        });
    }
    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrível que você quer dar aulas"
                description="O primeiro passo é preencher esse formulário de incrição"
            />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input
                            name="name"
                            label="Nome completo"
                            type="text"
                            required
                            value={name}
                            onChange={(e) => { setName(e.target.value) }} />
                        <Input
                            name="avatar"
                            label="Link da sua foto (comece com https://)"
                            type="url"
                            required
                            value={avatar}
                            onChange={(e) => { setAvatar(e.target.value) }} />
                        <Input
                            name="whatsapp"
                            label="Whatsapp (somente números)"
                            type="number"
                            required
                            value={whatsapp}
                            onChange={(e) => { setWhatsapp(e.target.value) }} />
                        <TextArea
                            name="bio"
                            label="Biografia"
                            required
                            value={bio}
                            onChange={(e) => { setBio(e.target.value) }} />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>
                        <Select
                            name="subject"
                            label="Matéria"
                            options={
                                [
                                    { value: 'Artes', label: 'Artes' },
                                    { value: 'Matemárica', label: 'Matemárica' },
                                    { value: 'Geografia', label: 'Geografia' }
                                ]
                            }
                            value={subject}
                            onChange={(e) => { setSubject(e.target.value) }}
                            required />
                        <Input
                            name="cost"
                            label="Custo da sua hora/aula"
                            type="number"
                            required
                            value={cost}
                            onChange={(e) => { setCost(e.target.value) }}
                        />
                    </fieldset>

                    <fieldset id="schedule-items">
                        <legend>Horários disponíveis
                            <button type="button" id="add-time" onClick={addNewScheduleItem}>+ Novo Horário</button>
                        </legend>

                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select
                                        name="week_day"
                                        label="Dia da semana"
                                        value={scheduleItem.week_day}
                                        onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                        options={
                                            [
                                                { value: '0', label: 'Domingo' },
                                                { value: '1', label: 'Segunda' },
                                                { value: '2', label: 'Terça' },
                                                { value: '3', label: 'Quarta' },
                                                { value: '4', label: 'Quinta' },
                                                { value: '5', label: 'Sexta' },
                                                { value: '6', label: 'Sábado' }
                                            ]
                                        }
                                    />
                                    <Input
                                        name="from"
                                        label="Das"
                                        type="time"
                                        required
                                        value={scheduleItem.from}
                                        onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                                    />
                                    <Input
                                        name="to"
                                        label="Até"
                                        type="time"
                                        required
                                        value={scheduleItem.to}
                                        onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                                    />
                                </div>
                            );
                        })}
                    </fieldset>
                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante" />
                        Importante! <br />
                        Preencha todos os dados
                    </p>
                        <button type="submit">Salvar cadastro</button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm;