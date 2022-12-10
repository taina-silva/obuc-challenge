import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import Modal from '@material-ui/core/Modal';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
    Container,
    Column,
    Row,
    ItemContainer,
    ItemDesription,
    InputTitle,
    FormInput,
    CustomCurrencyInput,
    ErrorSpan,
    ModalBox,
    ModalDescription,
    ModalTitle,
    AddRemoveButton,
} from './styles';
import PrincipalButton from '../../Components/Button/principalButton';

function FormScreen() {
    const navigate = useNavigate();
    const [ openModal, setOpenModal ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ modalDescription, setModalDescription ] = useState('');
    const [ activities, setActivities ] = useState([]);

    const validationSchema = Yup.object({
        jobTitle: Yup.string().required('Campo obrigatório'),
        salary: Yup.string().required('Campo obrigatório'),                    
    });

    function handleSubmit(values) {
        setIsLoading(true);
        fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
        .then(response => {
            getModalDescription(response).then(() => setIsLoading(false));
            handleOpenModal();
        });
    }

    const handleOpenModal = () => {
        setOpenModal(true);
    };
    
    const handleCloseModal = () => {
        setOpenModal(false);
        navigate('/');
    };

    async function getModalDescription(response) {
        var result = 'Resultado inesperado';
        if(response !== undefined ) {
            const body = await response.clone().text();
            const bodyAsJson = JSON.parse(body);
            if(response.status > 299) {
                if(bodyAsJson.detail.includes('already exists')) {
                    if (bodyAsJson.detail.includes('email')) result = 'Email já está em uso. Por favor insira outro';
                    else if (bodyAsJson.detail.includes('username')) result = 'Nome de usuário já está em uso. Por favor insira outro';
                } else result = 'Erro ao cadastrar usuário';
            }
            if(response.status >= 200 && response.status <= 299) result = 'Usuário cadastrado com sucesso';
        } 
        setModalDescription(result);
    }

    function addActivity(value) {
        if(!activities.includes(value)) setActivities(activities.concat(value));
    }

    function removeActivity(value) {
        setActivities(activities.filter(function(a) { 
            return a !== value
        }));
    }

    return (
        <Container>
            <Formik
                initialValues = {{
                    jobTitle: '',
                    salary: '',
                    activities: '',
                    benefits: '',
                    processSteps: '',
                    necessarySkills: '',
                    experienceNeeded: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {
                    ({
                        handleSubmit,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        values,
                        isSubmitting,
                        setFieldValue
                    }) => {
                        return (
                            <Form onSubmit={handleSubmit}>
                                <Column>
                                    <Column>
                                        <InputTitle>Título do cargo</InputTitle>
                                        <FormInput
                                            type='text' name='jobTitle' id='jobTitle'
                                            onChange={(e) => setFieldValue('jobTitle', e.target.value)}
                                            onBlur={handleBlur}
                                            value={values.jobTitle}
                                            showError={touched.jobTitle && errors.jobTitle}
                                        />
                                        {touched.jobTitle && errors.jobTitle && (
                                            <ErrorSpan>{errors.jobTitle}</ErrorSpan>
                                        )}
                                    </Column>

                                    <Column>
                                        <InputTitle>Salário</InputTitle>
                                        <CustomCurrencyInput
                                            name='salary' id='salary'
                                            onValueChange={(value) => setFieldValue('salary', value)}
                                            prefix="R$ "
                                            decimalSeparator="," 
                                            groupSeparator="."
                                            decimalsLimit={2}
                                        />
                                        {touched.salary && errors.salary && (
                                            <ErrorSpan>{errors.salary}</ErrorSpan>
                                        )}
                                    </Column>
                                                                    
                                    <Column>
                                        <InputTitle>Atividades a serem exercidas</InputTitle>
                                        <Row>
                                            <FormInput
                                                type='text' name='activities' id='activities'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.activities}
                                                showError={touched.activities && errors.activities}
                                            />
                                            <AddRemoveButton type='button' onClick={() => addActivity(values.activities)}>+</AddRemoveButton>
                                        </Row>                                    
                                        {touched.activities && errors.activities && (
                                            <ErrorSpan>{errors.activities}</ErrorSpan>
                                        )}
                                        {activities.map((a) => (
                                            <ItemContainer key={a}>
                                                <ItemDesription>{a}</ItemDesription>
                                                <AddRemoveButton type='button' onClick={() => removeActivity(a)}>-</AddRemoveButton>
                                            </ItemContainer>
                                        ))}
                                    </Column>
                                    <PrincipalButton text='EXPORTAR COMO PDF' onClick={handleCloseModal} />
                                </Column>
                            </Form>
                        )
                    }
                }       
            </Formik>    
            <Modal
                open={openModal}
                onClose={handleCloseModal}
            >
                <ModalBox>
                    <ModalTitle>ALERTA</ModalTitle>
                    {isLoading ? (
                        <ThreeDots 
                        height="40" 
                        width="80" 
                        radius="9"
                        color="blue" 
                        ariaLabel="three-dots-loading"
                        visible={true}
                         />
                    ) : (<ModalDescription>{modalDescription}</ModalDescription>)}
                    <PrincipalButton text='OK' onClick={handleCloseModal} />
                </ModalBox>
            </Modal>   
        </Container>
    );
}

export default FormScreen;
