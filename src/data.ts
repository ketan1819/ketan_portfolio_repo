export interface Project {
  id: string; name: string; subtitle: string; description: string; problem: string; solution: string
  tech: string[]; features: string[]; flow: string[]; github?: string; live?: string
  metrics?: { value: string; label: string }[]
}
export const projects: Project[] = [
  { id: 'societyhub', name: 'SocietyHub', subtitle: 'Society Management System',
    description: 'A modular monolith platform designed to manage society operations including residents, maintenance, complaints, notices, payments and administrative workflows.',
    problem: 'Housing societies manage residents, dues, complaints and notices across scattered tools.',
    solution: 'One modular monolith exposing REST APIs per domain module, with a layered Spring Boot design and versioned schema migrations.',
    tech: ['Java 21', 'Spring Boot', 'Spring Data JPA', 'Hibernate', 'MySQL', 'Flyway', 'React', 'REST APIs'],
    features: ['Authentication', 'Society Management', 'Resident Management', 'Complaint Management', 'Maintenance', 'Payments', 'Notice Management', 'Events', 'Notifications', 'Audit Logs'],
    flow: ['React', 'REST API', 'Spring Boot', 'Service Layer', 'JPA / Hibernate', 'MySQL'],
    github: 'https://github.com/ketan1819/Society_management_system_Backend', live: 'https://society-management-system-model.vercel.app/' },
  { id: 'ordermatrix', name: 'OrderMatrix', subtitle: 'Smart Purchase, Production & Dispatch Management',
    description: 'An enterprise-style order lifecycle management system designed to manage purchase orders, production workflows and dispatch operations.',
    problem: 'Orders move between purchasing, production and dispatch teams with no single view of status.',
    solution: 'A role-based system that tracks each order from purchase order to completion.',
    tech: ['Java', 'Spring Boot', 'React', 'REST APIs', 'Database'],
    features: ['Purchase Order', 'Production', 'Dispatch', 'Authentication', 'Role Management', 'Roles: Owner, Production Manager, Inventory, Dispatch'],
    flow: ['Purchase Order', 'Production', 'Quality / Processing', 'Dispatch', 'Order Completion'],
    github: 'https://github.com/ketan1819/order-lifecycle-management-system-backend' },
  { id: 'serverless', name: 'AWS Serverless Task Manager', subtitle: 'Serverless REST API',
    description: 'A cloud-based serverless task management API built using AWS Lambda, API Gateway, DynamoDB and IAM, with a frontend consuming the REST APIs.',
    problem: 'A task API that needs no servers to provision or manage.',
    solution: 'API Gateway routes requests to Lambda functions that read and write DynamoDB, secured with scoped IAM permissions.',
    tech: ['AWS Lambda', 'API Gateway', 'DynamoDB', 'IAM', 'REST APIs', 'JavaScript'],
    features: ['Create Task', 'Get Tasks', 'Delete Task', 'REST API', 'CORS', 'IAM permissions'],
    flow: ['Frontend', 'API Gateway', 'AWS Lambda', 'DynamoDB'] },
  { id: 'motorsense', name: 'MotorSense', subtitle: 'Industrial IoT Predictive Maintenance Platform',
    description: 'A predictive maintenance application that analyzes industrial sensor data to identify potential equipment failures using machine learning.',
    problem: 'Equipment failures are costly when found late.',
    solution: 'A Random Forest model trained on sensor data, served through a Flask app.',
    tech: ['Python', 'Flask', 'Scikit-learn', 'Random Forest', 'Pandas', 'NumPy', 'Matplotlib'],
    features: ['Sensor data analysis', 'Failure prediction', 'Web interface'],
    flow: ['Sensor Data', 'Pandas / NumPy', 'Random Forest', 'Flask App'],
    metrics: [{ value: '10K+', label: 'Sensor Data Points' }, { value: '92%', label: 'Accuracy' }],
    live: 'https://thermopredictor.onrender.com/' },
]
export const skills = [
  { cat: 'Backend', primary: ['Spring Boot', 'REST APIs', 'Spring Data JPA', 'Hibernate', 'Spring Security'], other: ['Spring Cloud', 'OpenFeign', 'API Gateway', 'Eureka'] },
  { cat: 'Cloud & DevOps', primary: ['AWS', 'Docker', 'Lambda', 'EC2', 'S3'], other: ['API Gateway', 'DynamoDB', 'RDS', 'VPC', 'CloudFront', 'CloudWatch', 'SQS', 'IAM'] },
  { cat: 'Languages', primary: ['Java'], other: ['C++', 'Python', 'C', 'JavaScript', 'SQL'] },
  { cat: 'Databases', primary: ['MySQL', 'PostgreSQL'], other: ['MongoDB', 'Redis', 'DynamoDB'] },
  { cat: 'Tools', primary: [], other: ['Git', 'GitHub', 'Linux', 'Gradle', 'Maven', 'Postman', 'VS Code', 'IntelliJ IDEA', 'Jupyter Notebook'] },
]
export const journey = [
  { when: '2024', title: 'System Programming', items: ['C++', 'Custom Virtual File System'] },
  { when: '2025', title: 'Machine Learning', items: ['Python', 'Scikit-learn', 'MotorSense'] },
  { when: '2025–2026', title: 'AWS & Cloud', items: ['Lambda', 'API Gateway', 'DynamoDB', 'EC2', 'S3', 'VPC'] },
  { when: '2026', title: 'Backend Engineering', items: ['Java', 'Spring Boot', 'JPA', 'Hibernate', 'MySQL', 'Docker', 'Microservices'] },
  { when: 'Current focus', title: 'Spring Boot, AWS, System Design', items: ['Backend Architecture'] },
]
export const certs = [
  { name: 'Machine Learning Specialization', issuer: 'Udemy', url: '' },
  { name: 'Logic Building & Problem Solving', issuer: 'Marvellous Infosystem', url: '' },
  { name: 'MotorSense Internship Project', issuer: 'SmartBridge / SkillFied Mentor', url: '' },
  { name: 'Networking', issuer: 'Cisco Networking Academy', url: '' },
] // TODO: add year + url per certificate
export const stats = [
  { value: 200, suffix: '+', label: 'LeetCode Problems' }, { value: 300, suffix: '+', label: 'CodeChef Problems' },
  { value: 10, suffix: 'K+', label: 'Sensor Data Points' }, { value: 92, suffix: '%', label: 'MotorSense Model Accuracy' },
]
export const architectures = [
  { title: 'Enterprise Backend', nodes: ['Client', 'REST API', 'Controller', 'Service', 'Repository', 'Database'] },
  { title: 'Serverless', nodes: ['Client', 'API Gateway', 'Lambda', 'DynamoDB'] },
  { title: 'Microservices', nodes: ['API Gateway', 'Order Service', 'Inventory Service', 'Payment Service', 'Notification Service'] },
]
