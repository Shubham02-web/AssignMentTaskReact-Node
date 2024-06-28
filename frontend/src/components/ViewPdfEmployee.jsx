/* eslint-disable react/prop-types */
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { margin: 10, padding: 10, flexGrow: 1 },
});

export const EmployeePDF = ({ employee }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <br />
        <Text>{employee.name} : Details :)</Text>
        <br />
        <br />
        <Text>Name = {employee.name}</Text>
        <br />
        <Text>Email = {employee.email}</Text>
        <br />
        <Text>Phone = {employee.phone}</Text>
        <br />
        <Text>Position = {employee.position}</Text>
        <br />
        <Text>Employee ID = {employee.employeeOfficeId}</Text>
        <br />
        <Text>Employee Image Path = {employee.imageUrl}</Text>
      </View>
    </Page>
  </Document>
);
