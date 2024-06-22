
USE db_projeto_dalva;

CREATE TABLE tb_doctors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    crm VARCHAR(13) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tb_patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    cpf VARCHAR(255) UNIQUE NOT NULL,
    gender CHAR(1) NOT NULL,
    date_of_birth DATE NOT NULL,
    cellphone VARCHAR(255) NOT NULL,
    diagnosis VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tb_appointments(
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    FOREIGN KEY (doctor_id) REFERENCES tb_doctors(id) ON DELETE CASCADE,
    FOREIGN KEY (patient_id) REFERENCES tb_patients(id) ON DELETE CASCADE
);

SELECT a.id, p.first_name as patient_first_name, p.last_name as patient_last_name,
           d.first_name as doctor_name,  d.last_name as doctor_last_name, a.appointment_date, a.appointment_time
    FROM tb_appointments a
    INNER JOIN tb_patients p ON a.patient_id = p.id
    INNER JOIN tb_doctors d ON a.doctor_id = d.id;

    