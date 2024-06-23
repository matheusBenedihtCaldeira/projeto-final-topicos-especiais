CREATE TABLE tb_appointments(
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    FOREIGN KEY (doctor_id) REFERENCES tb_doctors(id) ON DELETE CASCADE,
    FOREIGN KEY (patient_id) REFERENCES tb_patients(id) ON DELETE CASCADE
); 