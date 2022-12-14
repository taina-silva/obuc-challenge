import React, {useState, useEffect, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import { MenuItem } from '@material-ui/core';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import PrincipalButton from '../../Components/Button/principalButton';
import MultiItemsInput from '../../Components/Input/multiItems';
import JobPdfDocument from '../../Components/Pdf/pdfDocument';
import { saveAs } from 'file-saver';
import { pdf } from '@react-pdf/renderer';
import {
    Title,
    Container,
    MultiItemsInputsContainer,
    Column,
    FirstSection,
    ModalBox,
    ModalDescription,
    ModalTitle,
} from './styles';
import {
    FormInput,
    InputSelect,
    CustomCurrencyInput,
    InputTitle,
    ErrorSpan,
} from '../../Components/Input/styles';

function FormScreen() {
    const navigate = useNavigate();
    const [ openModal, setOpenModal ] = useState(false);
    const [ allJobsSpecifications, setAllJobsSpecifications ] = useState({});
    const [ jobSpecifications, setJobSpecifications ] = useState({
        jobTitle: '',
        salary: 0,
        activities: [],
        benefits: [],
        processSteps: [],
        necessarySkills: [],
        experienceNeeded: [],
    });
    const validationSchema = Yup.object({
        jobTitle: Yup.string().required('Campo obrigatório'),
        salary: Yup.string().required('Campo obrigatório'),                    
        activities: Yup.array().when([], {
            is: () => jobSpecifications.activities.length > 0,
            then: Yup.array().nullable(),
            otherwise: Yup.array().min(1, 'Especifique ao menos um item').nullable(),
        }),
        benefits: Yup.array().when([], {
            is: () => jobSpecifications.benefits.length > 0,
            then: Yup.array().nullable(),
            otherwise: Yup.array().min(1, 'Especifique ao menos um item').nullable(),
        }),
        processSteps: Yup.array().when([], {
            is: () => jobSpecifications.processSteps.length > 0,
            then: Yup.array().nullable(),
            otherwise: Yup.array().min(1, 'Especifique ao menos um item').nullable(),
        }),
        necessarySkills: Yup.array().when([], {
            is: () => jobSpecifications.necessarySkills.length > 0,
            then: Yup.array().nullable(),
            otherwise: Yup.array().min(1, 'Especifique ao menos um item').nullable(),
        }),
        experienceNeeded: Yup.array().when([], {
            is: () => jobSpecifications.experienceNeeded.length > 0,
            then: Yup.array().nullable(),
            otherwise: Yup.array().min(1, 'Especifique ao menos um item').nullable(),
        })            
    });

    const getAllJobs = useCallback(() => {
        fetch('http://localhost:3001')
        .then(response => {
            return response.text();
        })
        .then(data => {
            if(JSON.parse(data).code === 'ECONNREFUSED' || data.error) 
                console.log(data.error);
            else setAllJobsSpecifications(JSON.parse(data));
        });
    }, []);

    useEffect(() => {
        getAllJobs();
    }, [getAllJobs]);

    function updateJobSpecifications(jobTitle, salary) {
        const considerJobTitle = jobTitle && jobTitle !== '';
        const temp = JSON.parse(JSON.stringify((considerJobTitle && allJobsSpecifications[jobTitle]) ? allJobsSpecifications[jobTitle] : jobSpecifications));
        if(considerJobTitle) {
            temp['jobTitle'] = jobTitle;
            if(salary) temp['salary'] = salary;
            setJobSpecifications(temp);
        }
        else setJobSpecifications({
            jobTitle: '',
            salary: salary ?? 0,
            activities: [],
            benefits: [],
            processSteps: [],
            necessarySkills: [],
            experienceNeeded: [],
        })
    } 

    function addItem(id, value) {
        if(!jobSpecifications[id].includes(value)) {
            const temp = JSON.parse(JSON.stringify(jobSpecifications));
            temp[id] = jobSpecifications[id].concat(value);
            setJobSpecifications(temp);
        }
    }

    function removeItem(id, value) {
        const tempArray = jobSpecifications[id].filter(function(a) { 
            return a !== value
        })
        const tempObject = JSON.parse(JSON.stringify(jobSpecifications));;
        tempObject[id] = tempArray;
        setJobSpecifications(tempObject);
        console.log(tempObject);
    }

    const handleSubmit = async () => {   
        fetch('http://localhost:3001/jobs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jobSpecifications),
        })
        .then(() => {
            generatePdfDocument().then(() => {})
            .catch(() => handleOpenModal());
            navigate('/');            
        }).catch(() => handleOpenModal());
    };

    const generatePdfDocument = async () => {
        const blob = await pdf((
            <JobPdfDocument jobSpecifications={jobSpecifications}/>
        )).toBlob();
        saveAs(blob, 'formulario-vaga.pdf');
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };
    
    const handleCloseModal = () => {
        setOpenModal(false);
        navigate('/');
    };

    return (
        <>
            <Formik
                initialValues = {jobSpecifications}
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
                            <Form>
                                <Container>
                                    <Title>Formulário para divulgação de vaga</Title>
                                    <FirstSection>
                                        <Column>
                                            <InputTitle>Título do cargo</InputTitle>
                                            { Object.keys(allJobsSpecifications).length > 0 &&
                                                <Column>
                                                    <p style={{ margin: '10px 0' }} >Escolha entre vagas já cadastradas anteriormente...</p>
                                                    <InputSelect
                                                        name='jobTitle' id='jobTitle'
                                                        value={values.jobTitle}
                                                        label="Título da vaga"
                                                        onChange={(e) => {
                                                            setFieldValue('jobTitle', e.target.value)
                                                            updateJobSpecifications(e.target.value);
                                                        }}
                                                    >
                                                        {Object.keys(allJobsSpecifications).map((k) => (
                                                            <MenuItem key={k} value={k}>{k}</MenuItem>
                                                        ))}
                                                    </InputSelect>
                                                </Column>
                                            }                                            
                                            
                                            <Column>
                                                { Object.keys(allJobsSpecifications).length > 0 &&
                                                    <p style={{ marginBottom: '5px' }} >Ou insira uma nova</p>
                                                }
                                                <FormInput
                                                    type='text' name='jobTitle' id='jobTitle'
                                                    value={values.jobTitle}
                                                    onChange={(e) => {
                                                        setFieldValue('jobTitle', e.target.value)
                                                        updateJobSpecifications(e.target.value);
                                                    }}
                                                    onBlur={handleBlur}
                                                    showError={touched.jobTitle && errors.jobTitle}
                                                />
                                                <ErrorSpan showError={touched.jobTitle && errors.jobTitle}>{errors.jobTitle}</ErrorSpan>
                                            </Column>                                            
                                        </Column>

                                        <Column>
                                            <InputTitle>Salário</InputTitle>
                                            <CustomCurrencyInput
                                                name='salary' id='salary'
                                                value={jobSpecifications.salary}
                                                onValueChange={(value) => {
                                                    setFieldValue('salary', value)
                                                    updateJobSpecifications(values.jobTitle, value);
                                                }}
                                                prefix='R$ '
                                                decimalSeparator=',' 
                                                groupSeparator='.'
                                                decimalsLimit={2}
                                            />
                                            <ErrorSpan showError={touched.salary && errors.salary}>{errors.salary}</ErrorSpan>
                                        </Column>
                                    </FirstSection>  

                                    <MultiItemsInputsContainer>                        
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
                                            itemsList={jobSpecifications.activities}
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
                                            itemsList={jobSpecifications.benefits}
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
                                            itemsList={jobSpecifications.processSteps}
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
                                            itemsList={jobSpecifications.necessarySkills}
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
                                            itemsList={jobSpecifications.experienceNeeded}
                                            addItem={() => addItem('experienceNeeded', values.experienceNeeded)}
                                            removeItem={(value) => removeItem('experienceNeeded', value)}
                                            errorDescription={touched.experienceNeeded && errors.experienceNeeded ? errors.experienceNeeded : ''}
                                        />
                                    </MultiItemsInputsContainer>
                                    <PrincipalButton type='submit' text='GERAR PDF' onClick={handleSubmit} />
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
                    <ModalDescription>Erro ao gerar documento</ModalDescription>
                    <PrincipalButton text='OK' onClick={handleCloseModal} />
                </ModalBox>
            </Modal>   
        </>
    );
}

export default FormScreen;
