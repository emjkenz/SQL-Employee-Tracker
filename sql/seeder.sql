-- Insert sample departments
INSERT INTO departments (name) VALUES
  ('Sales'),
  ('Marketing'),
  ('Finance');

-- Insert sample roles
INSERT INTO roles (title, salary, department_id) VALUES
  ('Sales Manager', 5000.00, 1),
  ('Sales Representative', 3000.00, 1),
  ('Marketing Manager', 4500.00, 2),
  ('Marketing Specialist', 3500.00, 2),
  ('Finance Manager', 5500.00, 3),
  ('Accountant', 4000.00, 3);

-- Insert sample employees
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 2, 1),
  ('Michael', 'Johnson', 3, 1),
  ('Emily', 'Davis', 4, 2),
  ('David', 'Brown', 5, 3),
  ('Sarah', 'Wilson', 6, 3);
