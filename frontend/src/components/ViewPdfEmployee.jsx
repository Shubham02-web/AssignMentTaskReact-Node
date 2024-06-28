/* eslint-disable react/prop-types */
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
    backgroundColor: "#f8f9fa",
  },
  header: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    color: "#4a90e2",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#dcdcdc",
    borderRadius: 5,
    backgroundColor: "#ffffff",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "30%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#dcdcdc",
    padding: 5,
    textAlign: "center",
  },
  tableCol: {
    width: "70%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#dcdcdc",
    padding: 5,
    textAlign: "center",
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 12,
    textAlign: "center",
    fontWeight: "bold",
  },
  tableCell: {
    margin: 5,
    fontSize: 12,
    textAlign: "center",
  },
  image: {
    width: 80,
    height: 80,
    objectFit: "cover",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    margin: "auto",
  },
  footer: {
    marginTop: 30,
    textAlign: "center",
    fontSize: 10,
    color: "#aaa",
  },
});

export const EmployeePDF = ({ employee }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.header}>{employee.name}</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Name</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{employee.name}</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Email</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{employee.email}</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Phone</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{employee.phone}</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Position</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{employee.position}</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Employee ID</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{employee.employeeOfficeId}</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Employee Image</Text>
          </View>
          <View style={styles.tableCol}>
            <Image
              src={`http://localhost:8000/${employee.imageUrl}`}
              alt={employee.imageUrl}
              style={styles.image}
            />
          </View>
        </View>
      </View>
      <Text style={styles.footer}>{employee.name} Details</Text>
    </Page>
  </Document>
);
