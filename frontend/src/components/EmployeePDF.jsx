/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import axios from "axios";

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { margin: 10, padding: 10, flexGrow: 1 },
});

const EmployeePDF = ({ employee }) => (
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

const EmployeePDFDownload = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState([]);

  const fetchEmployee = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/employees/SingleEmployee/${id}`
      );
      setEmployee(response.data.employee);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEmployee(id);
  }, []);

  if (!employee) return <div>Loading...</div>;

  return (
    <PDFDownloadLink
      document={<EmployeePDF employee={employee} />}
      fileName={`${employee.name}.pdf`}
    >
      {({ blob, url, loading, error }) =>
        loading ? "Loading document..." : "Download PDF"
      }
    </PDFDownloadLink>
  );
};

export default EmployeePDFDownload;
