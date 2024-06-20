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
        <Text>Name: {employee.name}</Text>
        <Text>Email: {employee.email}</Text>
        <Text>Phone: {employee.phone}</Text>
        <Text>Position: {employee.position}</Text>
        <Text>Employee ID: {employee.employeeId}</Text>
      </View>
    </Page>
  </Document>
);

const EmployeePDFDownload = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  const fetchEmployee = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/employees/${id}`
      );
      setEmployee(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, [id]);

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
