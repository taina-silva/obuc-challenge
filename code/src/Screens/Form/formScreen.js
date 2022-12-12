import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import Modal from '@material-ui/core/Modal';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import PrincipalButton from '../../Components/Button/principalButton';
import MultiItemsInput from '../../Components/Input/multiItems';
import JobPdfDocument from '../../Components/Pdf/pdfDocument';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { pdf } from '@react-pdf/renderer';
import {
    Container,
    Column,
    Row,
    ModalBox,
    ModalDescription,
    ModalTitle,
} from './styles';
import {
    FormInput,
    CustomCurrencyInput,
    InputTitle,
    ErrorSpan,
} from '../../Components/Input/styles';

function FormScreen() {
    const navigate = useNavigate();
    const [ openModal, setOpenModal ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ modalDescription, setModalDescription ] = useState('');
    const [ activities, setActivities ] = useState([]);
    const [ benefits, setBenefits ] = useState([]);
    const [ processSteps, setProcessSteps ] = useState([]);
    const [ necessarySkills, setNecessarySkills ] = useState([]);
    const [ experienceNeeded, setExperienceNeeded ] = useState([]);

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

    function addItem(id, value) {
        const getSet = {
            activities: () => { if(!activities.includes(value)) setActivities(activities.concat(value)) },
            benefits: () => { if(!benefits.includes(value)) setBenefits(benefits.concat(value)) },
            processSteps: () => { if(!processSteps.includes(value)) setProcessSteps(processSteps.concat(value)) },
            necessarySkills: () => { if(!necessarySkills.includes(value)) setNecessarySkills(necessarySkills.concat(value)) },
            experienceNeeded: () => { if(!experienceNeeded.includes(value)) setExperienceNeeded(experienceNeeded.concat(value)) },
        }
        getSet[id]();
    }

    function removeItem(id, value) {
        const getSet = {
            activities: () => setActivities(activities.filter(function(a) { 
                return a !== value
            })),
            benefits: () => setBenefits(benefits.filter(function(a) { 
                return a !== value
            })),
            processSteps: () => setProcessSteps(processSteps.filter(function(a) { 
                return a !== value
            })),
            necessarySkills: () => setNecessarySkills(necessarySkills.filter(function(a) { 
                return a !== value
            })),
            experienceNeeded: () => setExperienceNeeded(experienceNeeded.filter(function(a) { 
                return a !== value
            })),
        }
        getSet[id]();
    }

    const generatePdfDocument = async (jobTitle, salary) => {
        const blob = await pdf((
            <JobPdfDocument jobSpecifications={{
                    jobTitle: jobTitle,
                    salary: salary,
                    activities: activities,
                    benefits: benefits,
                    processSteps: processSteps,
                    necessarySkills: necessarySkills,
                    experienceNeeded: experienceNeeded,
                }}
            />
        )).toBlob();
        saveAs(blob, 'formulario-vaga.pdf');
    };

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
                                <Container>
                                    <Row>
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
                                                prefix='R$ '
                                                decimalSeparator=',' 
                                                groupSeparator='.'
                                                decimalsLimit={2}
                                            />
                                            {touched.salary && errors.salary && (
                                                <ErrorSpan>{errors.salary}</ErrorSpan>
                                            )}
                                        </Column>
                                    </Row>                            

                                    <MultiItemsInput 
                                        title='Atividades a serem exercidas'
                                        getFormInput={() => {
                                            return <FormInput
                                                type='text' name='activities' id='activities'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.activities}
                                                showError={touched.activities && errors.activities}
                                            />
                                        }}
                                        itemsList={activities}
                                        addItem={() => addItem('activities', values.activities)}
                                        removeItem={(value) => removeItem('activities', value)}
                                        errorDescription={touched.activities && errors.activities ? errors.activities : ''}
                                    />

                                    <MultiItemsInput 
                                        title='Benefícios do cargo'
                                        getFormInput={() => {
                                            return <FormInput
                                                type='text' name='benefits' id='benefits'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.benefits}
                                                showError={touched.benefits && errors.benefits}
                                            />
                                        }}
                                        itemsList={benefits}
                                        addItem={() => addItem('benefits', values.benefits)}
                                        removeItem={(value) => removeItem('benefits', value)}
                                        errorDescription={touched.benefits && errors.benefits ? errors.benefits : ''}
                                    />

                                    <MultiItemsInput 
                                        title='Etapas do processo'
                                        getFormInput={() => {
                                            return <FormInput
                                                type='text' name='processSteps' id='processSteps'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.processSteps}
                                                showError={touched.processSteps && errors.processSteps}
                                            />
                                        }}
                                        itemsList={processSteps}
                                        addItem={() => addItem('processSteps', values.processSteps)}
                                        removeItem={(value) => removeItem('processSteps', value)}
                                        errorDescription={touched.processSteps && errors.processSteps ? errors.processSteps : ''}
                                    />

                                    <MultiItemsInput 
                                        title='Habilidades necessárias'
                                        getFormInput={() => {
                                            return <FormInput
                                                type='text' name='necessarySkills' id='necessarySkills'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.necessarySkills}
                                                showError={touched.necessarySkills && errors.necessarySkills}
                                            />
                                        }}
                                        itemsList={necessarySkills}
                                        addItem={() => addItem('necessarySkills', values.necessarySkills)}
                                        removeItem={(value) => removeItem('necessarySkills', value)}
                                        errorDescription={touched.necessarySkills && errors.necessarySkills ? errors.necessarySkills : ''}
                                    />

                                    <MultiItemsInput 
                                        title='Experiência necessária'
                                        getFormInput={() => {
                                            return <FormInput
                                                type='text' name='experienceNeeded' id='experienceNeeded'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.experienceNeeded}
                                                showError={touched.experienceNeeded && errors.experienceNeeded}
                                            />
                                        }}
                                        itemsList={experienceNeeded}
                                        addItem={() => addItem('experienceNeeded', values.experienceNeeded)}
                                        removeItem={(value) => removeItem('experienceNeeded', value)}
                                        errorDescription={touched.experienceNeeded && errors.experienceNeeded ? errors.experienceNeeded : ''}
                                    />
                                    <PrincipalButton type='submit' text='GERAR PDF' onClick={() => generatePdfDocument(values.jobTitle, values.salary)} />
                                </Container>
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
                        height='40' 
                        width='80' 
                        radius='9'
                        color='blue' 
                        ariaLabel='three-dots-loading'
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
