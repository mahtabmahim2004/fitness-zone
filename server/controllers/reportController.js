const PDFDocument = require("pdfkit");
const ExcelJS = require("exceljs");
const pool = require("../config/db");

// ======================================
// PDF HEADER
// ======================================
const drawHeader = (doc, title) => {
  doc
    .fontSize(22)
    .fillColor("#0d6efd")
    .text("GYM MANAGEMENT SYSTEM", {
      align: "center",
    });

  doc.moveDown(0.3);

  doc
    .fontSize(17)
    .fillColor("black")
    .text(title, {
      align: "center",
    });

  doc.moveDown(0.5);

  doc
    .fontSize(11)
    .fillColor("gray")
    .text(`Generated: ${new Date().toLocaleString()}`, {
      align: "right",
    });

  doc.moveDown();
};

// ======================================
// PDF FOOTER
// ======================================
const drawFooter = (doc) => {
  const page = doc.bufferedPageRange().count;

  doc
    .fontSize(10)
    .fillColor("gray")
    .text(
      `Gym Management System | Page ${page}`,
      50,
      760,
      {
        width: 500,
        align: "center",
      }
    );

  doc.fillColor("black");
};

// ======================================
// MEMBERS TABLE HEADER
// ======================================
const drawMembersHeader = (doc, y) => {
  doc.rect(50, y, 500, 25).fill("#0d6efd");

  doc.fillColor("white").fontSize(11);

  doc.text("ID", 60, y + 7);
  doc.text("Name", 100, y + 7);
  doc.text("Phone", 260, y + 7);
  doc.text("Age", 360, y + 7);
  doc.text("Membership", 420, y + 7);

  doc.fillColor("black");
};

// ======================================
// PAYMENTS TABLE HEADER
// ======================================
const drawPaymentsHeader = (doc, y) => {
  doc.rect(50, y, 500, 25).fill("#0d6efd");

  doc.fillColor("white").fontSize(11);

  doc.text("ID", 55, y + 7);
  doc.text("Member", 90, y + 7);
  doc.text("Package", 210, y + 7);
  doc.text("Amount", 320, y + 7);
  doc.text("Method", 395, y + 7);
  doc.text("Date", 470, y + 7);

  doc.fillColor("black");
};

// ======================================
// ATTENDANCE TABLE HEADER
// ======================================
const drawAttendanceHeader = (doc, y) => {
  doc.rect(50, y, 500, 25).fill("#0d6efd");

  doc.fillColor("white").fontSize(11);

  doc.text("ID", 55, y + 7);
  doc.text("Member", 100, y + 7);
  doc.text("Check In", 240, y + 7);
  doc.text("Check Out", 400, y + 7);

  doc.fillColor("black");
};

// ======================================
// EXCEL STYLE
// ======================================
const styleWorksheet = (worksheet) => {
  worksheet.getRow(1).font = {
    bold: true,
    size: 13,
  };

  worksheet.getRow(1).alignment = {
    horizontal: "center",
    vertical: "middle",
  };

  worksheet.getRow(1).eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "0D6EFD" },
    };

    cell.font = {
      color: { argb: "FFFFFF" },
      bold: true,
    };

    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;

    row.eachCell((cell) => {
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
  });
};
// ======================================
// MEMBERS PDF REPORT
// ======================================
const downloadMembersReport = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        id,
        full_name,
        phone,
        age,
        membership_type
      FROM members
      ORDER BY id ASC
    `);

    const members = result.rows;

    const doc = new PDFDocument({
      size: "A4",
      margin: 50,
      bufferPages: true,
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Members_Report.pdf"
    );

    doc.pipe(res);

    drawHeader(doc, "Members Report");

    let y = 150;

    drawMembersHeader(doc, y);

    y += 35;

    for (const member of members) {
      if (y > 730) {
        drawFooter(doc);

        doc.addPage();

        drawHeader(doc, "Members Report");

        y = 150;

        drawMembersHeader(doc, y);

        y += 35;
      }

      doc.fontSize(10).fillColor("black");

      doc.text(String(member.id), 60, y);

      doc.text(member.full_name || "-", 100, y, {
        width: 140,
      });

      doc.text(member.phone || "-", 260, y);

      doc.text(String(member.age ?? "-"), 360, y);

      doc.text(member.membership_type || "-", 420, y);

      y += 22;
    }

    drawFooter(doc);

    doc.end();
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to generate Members Report",
      error: error.message,
    });
  }
};

// ======================================
// MEMBERS EXCEL REPORT
// ======================================
const downloadMembersExcelReport = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        id,
        full_name,
        phone,
        age,
        gender,
        membership_type
      FROM members
      ORDER BY id ASC
    `);

    const workbook = new ExcelJS.Workbook();

    const worksheet = workbook.addWorksheet("Members");

    worksheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Full Name", key: "full_name", width: 30 },
      { header: "Phone", key: "phone", width: 20 },
      { header: "Age", key: "age", width: 10 },
      { header: "Gender", key: "gender", width: 15 },
      { header: "Membership", key: "membership_type", width: 25 },
    ];

    result.rows.forEach((member) => {
      worksheet.addRow(member);
    });

    styleWorksheet(worksheet);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Members_Report.xlsx"
    );

    await workbook.xlsx.write(res);

    res.end();
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to generate Members Excel Report",
      error: error.message,
    });
  }
};
// ======================================
// PAYMENTS PDF REPORT
// ======================================
const downloadPaymentsReport = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        p.payment_id,
        m.full_name AS member_name,
        mp.package_name,
        p.amount,
        p.payment_method,
        p.payment_date
      FROM payments p
      JOIN members m
        ON p.member_id = m.id
      JOIN membership_packages mp
        ON p.package_id = mp.package_id
      ORDER BY p.payment_id ASC
    `);

    const payments = result.rows;

    const doc = new PDFDocument({
      size: "A4",
      margin: 50,
      bufferPages: true,
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Payments_Report.pdf"
    );

    doc.pipe(res);

    drawHeader(doc, "Payments Report");

    let y = 150;

    drawPaymentsHeader(doc, y);

    y += 35;

    for (const payment of payments) {
      if (y > 730) {
        drawFooter(doc);

        doc.addPage();

        drawHeader(doc, "Payments Report");

        y = 150;

        drawPaymentsHeader(doc, y);

        y += 35;
      }

      doc.fontSize(10).fillColor("black");

      doc.text(String(payment.payment_id), 55, y);

      doc.text(payment.member_name || "-", 90, y, {
        width: 110,
      });

      doc.text(payment.package_name || "-", 210, y, {
        width: 90,
      });

      doc.text(String(payment.amount), 320, y);

      doc.text(payment.payment_method || "-", 395, y);

      const paymentDate = payment.payment_date
        ? new Date(payment.payment_date).toLocaleDateString()
        : "-";

      doc.text(paymentDate, 470, y);

      y += 22;
    }

    drawFooter(doc);

    doc.end();
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to generate Payments Report",
      error: error.message,
    });
  }
};

// ======================================
// PAYMENTS EXCEL REPORT
// ======================================
const downloadPaymentsExcelReport = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        p.payment_id,
        m.full_name AS member_name,
        mp.package_name,
        p.amount,
        p.payment_method,
        p.payment_date
      FROM payments p
      JOIN members m
        ON p.member_id = m.id
      JOIN membership_packages mp
        ON p.package_id = mp.package_id
      ORDER BY p.payment_id ASC
    `);

    const workbook = new ExcelJS.Workbook();

    const worksheet = workbook.addWorksheet("Payments");

    worksheet.columns = [
      { header: "Payment ID", key: "payment_id", width: 15 },
      { header: "Member Name", key: "member_name", width: 30 },
      { header: "Package", key: "package_name", width: 25 },
      { header: "Amount", key: "amount", width: 15 },
      { header: "Payment Method", key: "payment_method", width: 20 },
      { header: "Payment Date", key: "payment_date", width: 25 },
    ];

    result.rows.forEach((payment) => {
      worksheet.addRow({
        ...payment,
        payment_date: payment.payment_date
          ? new Date(payment.payment_date).toLocaleDateString()
          : "-",
      });
    });

    styleWorksheet(worksheet);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Payments_Report.xlsx"
    );

    await workbook.xlsx.write(res);

    res.end();
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to generate Payments Excel Report",
      error: error.message,
    });
  }
};
// ======================================
// ATTENDANCE PDF REPORT
// ======================================
const downloadAttendanceReport = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        a.attendance_id,
        m.full_name AS member_name,
        a.check_in,
        a.check_out
      FROM attendance a
      JOIN members m
        ON a.member_id = m.id
      ORDER BY a.attendance_id ASC
    `);

    const attendance = result.rows;

    const doc = new PDFDocument({
      size: "A4",
      margin: 50,
      bufferPages: true,
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Attendance_Report.pdf"
    );

    doc.pipe(res);

    drawHeader(doc, "Attendance Report");

    let y = 150;

    drawAttendanceHeader(doc, y);

    y += 35;

    for (const item of attendance) {
      if (y > 730) {
        drawFooter(doc);

        doc.addPage();

        drawHeader(doc, "Attendance Report");

        y = 150;

        drawAttendanceHeader(doc, y);

        y += 35;
      }

      doc.fontSize(10).fillColor("black");

      doc.text(String(item.attendance_id), 55, y);

      doc.text(item.member_name || "-", 100, y, {
        width: 120,
      });

      const checkIn = item.check_in
        ? new Date(item.check_in).toLocaleString()
        : "-";

      const checkOut = item.check_out
        ? new Date(item.check_out).toLocaleString()
        : "-";

      doc.text(checkIn, 240, y, {
        width: 140,
      });

      doc.text(checkOut, 400, y, {
        width: 140,
      });

      y += 28;
    }

    drawFooter(doc);

    doc.end();
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to generate Attendance Report",
      error: error.message,
    });
  }
};

// ======================================
// ATTENDANCE EXCEL REPORT
// ======================================
const downloadAttendanceExcelReport = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        a.attendance_id,
        m.full_name AS member_name,
        a.check_in,
        a.check_out
      FROM attendance a
      JOIN members m
        ON a.member_id = m.id
      ORDER BY a.attendance_id ASC
    `);

    const workbook = new ExcelJS.Workbook();

    const worksheet = workbook.addWorksheet("Attendance");

    worksheet.columns = [
      { header: "Attendance ID", key: "attendance_id", width: 18 },
      { header: "Member Name", key: "member_name", width: 30 },
      { header: "Check In", key: "check_in", width: 28 },
      { header: "Check Out", key: "check_out", width: 28 },
    ];

    result.rows.forEach((item) => {
      worksheet.addRow({
        attendance_id: item.attendance_id,
        member_name: item.member_name,
        check_in: item.check_in
          ? new Date(item.check_in).toLocaleString()
          : "-",
        check_out: item.check_out
          ? new Date(item.check_out).toLocaleString()
          : "-",
      });
    });

    styleWorksheet(worksheet);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Attendance_Report.xlsx"
    );

    await workbook.xlsx.write(res);

    res.end();
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to generate Attendance Excel Report",
      error: error.message,
    });
  }
};
// ======================================
// DASHBOARD PDF REPORT
// ======================================
const downloadDashboardReport = async (req, res) => {
  try {
    const [
      totalMembers,
      totalTrainers,
      totalPackages,
      totalRevenue,
      todayAttendance,
      activeMembers,
    ] = await Promise.all([
      pool.query("SELECT COUNT(*) AS total FROM members"),
      pool.query("SELECT COUNT(*) AS total FROM trainers"),
      pool.query("SELECT COUNT(*) AS total FROM membership_packages"),
      pool.query("SELECT COALESCE(SUM(amount),0) AS total FROM payments"),
      pool.query(
        "SELECT COUNT(*) AS total FROM attendance WHERE DATE(check_in)=CURRENT_DATE"
      ),
      pool.query(
        "SELECT COUNT(*) AS total FROM attendance WHERE check_out IS NULL"
      ),
    ]);

    const doc = new PDFDocument({
      size: "A4",
      margin: 50,
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Dashboard_Report.pdf"
    );

    doc.pipe(res);

    drawHeader(doc, "Dashboard Report");

    doc.fontSize(14);

    doc.text(`Total Members : ${totalMembers.rows[0].total}`);
    doc.moveDown();

    doc.text(`Total Trainers : ${totalTrainers.rows[0].total}`);
    doc.moveDown();

    doc.text(`Total Packages : ${totalPackages.rows[0].total}`);
    doc.moveDown();

    doc.text(`Total Revenue : ${totalRevenue.rows[0].total} BDT`);
    doc.moveDown();

    doc.text(`Today's Attendance : ${todayAttendance.rows[0].total}`);
    doc.moveDown();

    doc.text(`Active Members : ${activeMembers.rows[0].total}`);

    drawFooter(doc);

    doc.end();
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to generate Dashboard Report",
      error: error.message,
    });
  }
};

// ======================================
// DASHBOARD EXCEL REPORT
// ======================================
const downloadDashboardExcelReport = async (req, res) => {
  try {
    const [
      totalMembers,
      totalTrainers,
      totalPackages,
      totalRevenue,
      todayAttendance,
      activeMembers,
    ] = await Promise.all([
      pool.query("SELECT COUNT(*) AS total FROM members"),
      pool.query("SELECT COUNT(*) AS total FROM trainers"),
      pool.query("SELECT COUNT(*) AS total FROM membership_packages"),
      pool.query("SELECT COALESCE(SUM(amount),0) AS total FROM payments"),
      pool.query(
        "SELECT COUNT(*) AS total FROM attendance WHERE DATE(check_in)=CURRENT_DATE"
      ),
      pool.query(
        "SELECT COUNT(*) AS total FROM attendance WHERE check_out IS NULL"
      ),
    ]);

    const workbook = new ExcelJS.Workbook();

    const worksheet = workbook.addWorksheet("Dashboard");

    worksheet.columns = [
      { header: "Metric", key: "metric", width: 35 },
      { header: "Value", key: "value", width: 20 },
    ];

    worksheet.addRow({
      metric: "Total Members",
      value: totalMembers.rows[0].total,
    });

    worksheet.addRow({
      metric: "Total Trainers",
      value: totalTrainers.rows[0].total,
    });

    worksheet.addRow({
      metric: "Total Packages",
      value: totalPackages.rows[0].total,
    });

    worksheet.addRow({
      metric: "Total Revenue (BDT)",
      value: totalRevenue.rows[0].total,
    });

    worksheet.addRow({
      metric: "Today's Attendance",
      value: todayAttendance.rows[0].total,
    });

    worksheet.addRow({
      metric: "Active Members",
      value: activeMembers.rows[0].total,
    });

    styleWorksheet(worksheet);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Dashboard_Report.xlsx"
    );

    await workbook.xlsx.write(res);

    res.end();
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to generate Dashboard Excel Report",
      error: error.message,
    });
  }
};

// ======================================
// EXPORT
// ======================================
module.exports = {
  downloadMembersReport,
  downloadPaymentsReport,
  downloadAttendanceReport,
  downloadDashboardReport,

  downloadMembersExcelReport,
  downloadPaymentsExcelReport,
  downloadAttendanceExcelReport,
  downloadDashboardExcelReport,
};