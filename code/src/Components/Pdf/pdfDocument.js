import React from 'react';
import PropTypes from 'prop-types';
import { Page, Text, Image, View, Document, StyleSheet } from '@react-pdf/renderer';
import DoceMariaLogo from '../../assets/doce_maria.png';

const styles = StyleSheet.create({
  page: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    fontFamily: 'Times-Roman',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 18,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0babdc',
  },
  text: {
    fontSize: 18,
    textAlign: 'justify',
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  ul: {
    marginLeft: 18,
    marginRight: 8,
  },
});

function JobPdfDocument(props) {
  const { jobTitle, salary, activities, benefits, processSteps, necessarySkills, experienceNeeded } = props.jobSpecifications;

  return (
    <Document>
        <Page style={styles.page}>
          <Image style={styles.image} src={DoceMariaLogo} />
          <Text style={styles.header} fixed>{'Vaga para ' + jobTitle}</Text>
          <View style={styles.row}>
            <Text style={styles.title} fixed>Salário: </Text>
            <Text style={styles.text} fixed>{'R$ ' + salary}</Text>
          </View>
          { Array.from(activities).length > 0 &&
            <View style={styles.column}>
              <Text style={styles.title} fixed>Atividades a serem exercidas:</Text>
              {activities.map((a) => (
                <View key={a} style={styles.row}>
                  <Text style={styles.ul}>-</Text>
                  <Text style={styles.text}>{a}</Text>
                </View>
              ))}
            </View>
          }
          { Array.from(benefits).length > 0 &&
            <View style={styles.column}>
              <Text style={styles.title} fixed>Benefícios do cargo:</Text>
              {benefits.map((a) => (
                <View key={a} style={styles.row}>
                  <Text style={styles.ul}>-</Text>
                  <Text style={styles.text}>{a}</Text>
                </View>
              ))}
            </View>
          }         
          { Array.from(processSteps).length > 0 &&
            <View style={styles.column}>
              <Text style={styles.title} fixed>Etapas do processo:</Text>
              {processSteps.map((a) => (
                <View key={a} style={styles.row}>
                  <Text style={styles.ul}>-</Text>
                  <Text style={styles.text}>{a}</Text>
                </View>
              ))}
            </View>
          }
          { Array.from(necessarySkills).length > 0 &&
            <View style={styles.column}>
              <Text style={styles.title} fixed>Habilidades necessárias:</Text>
              {necessarySkills.map((a) => (
                <View key={a} style={styles.row}>
                  <Text style={styles.ul}>-</Text>
                  <Text style={styles.text}>{a}</Text>
                </View>
              ))}
            </View>
          }
          { Array.from(experienceNeeded).length > 0 &&
            <View style={styles.column}>
              <Text style={styles.title} fixed>Experiência necessária:</Text>
              {experienceNeeded.map((a) => (
                <View key={a} style={styles.row}>
                  <Text style={styles.ul}>-</Text>
                  <Text style={styles.text}>{a}</Text>
                </View>
              ))}
            </View>
          }          
        </Page>
    </Document>
  )
};

const jobSpecificationsShape = {
  jobTitle: PropTypes.string.isRequired,
  salary: PropTypes.number.isRequired,
  activities: PropTypes.arrayOf(String).isRequired,
  benefits: PropTypes.arrayOf(String).isRequired,
  processSteps: PropTypes.arrayOf(String).isRequired,
  necessarySkills: PropTypes.arrayOf(String).isRequired,
  experienceNeeded: PropTypes.arrayOf(String).isRequired,
}

JobPdfDocument.propTypes = {
  jobSpecifications: PropTypes.objectOf(PropTypes.shape(jobSpecificationsShape))
};

export default JobPdfDocument;