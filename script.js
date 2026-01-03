// Student Management System - Complete JavaScript with all fixes
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
});

// System Data with all RUET departments
const systemData = {
    totalUsers: 18,
    students: [
        { 
            id: 2310047, 
            name: "Mustakim Al Siyam", 
            department: "ECE",
            semester: 3,
            registered: false, 
            marks: [-1, -1, -1, -1, -1],
            courses: ["Analog Electronics-1", "Object Oriented Programming", "Circuit and Systems-2", "Math", "Humanities"],
            contact: "2310047@student.ruet.ac.bd",
            phone: "+880123456789",
            credits: [3, 3, 3, 3, 3]
        },
        { 
            id: 2310050, 
            name: "Salauddin Sikder", 
            department: "ECE",
            semester: 3,
            registered: true, 
            marks: [85, 78, 92, 88, 75],
            courses: ["Analog Electronics-1", "Object Oriented Programming", "Circuit and Systems-2", "Math", "Humanities"],
            contact: "2310050@student.ruet.ac.bd",
            phone: "+880123456780",
            credits: [3, 3, 3, 3, 3]
        },
        { 
            id: 2310053, 
            name: "Al Saniat Samim", 
            department: "ECE",
            semester: 3,
            registered: true, 
            marks: [65, 72, 68, 70, 74],
            courses: ["Analog Electronics-1", "Object Oriented Programming", "Circuit and Systems-2", "Math", "Humanities"],
            contact: "2310053@student.ruet.ac.bd",
            phone: "+880123456781",
            credits: [3, 3, 3, 3, 3]
        },
        { 
            id: 2310056, 
            name: "N.M Sakib", 
            department: "ECE",
            semester: 3,
            registered: true, 
            marks: [90, 85, 88, 92, 87],
            courses: ["Analog Electronics-1", "Object Oriented Programming", "Circuit and Systems-2", "Math", "Humanities"],
            contact: "2310056@student.ruet.ac.bd",
            phone: "+880123456782",
            credits: [3, 3, 3, 3, 3]
        }
    ],
    teachers: [
        { 
            id: 100, 
            name: "Dr. Kim Jung", 
            department: "ECE",
            contact: "kim.jung@ruet.ac.bd",
            phone: "+880123456783",
            assignedCourses: ["Analog Electronics-1", "Object Oriented Programming", "Circuit and Systems-2"]
        },
        { 
            id: 101, 
            name: "Prof. Sarah Smith", 
            department: "EEE",
            contact: "sarah.smith@ruet.ac.bd",
            phone: "+880123456784",
            assignedCourses: ["Math", "Humanities"]
        },
        { 
            id: 102, 
            name: "Dr. Robert Chen", 
            department: "ETE",
            contact: "robert.chen@ruet.ac.bd",
            phone: "+880123456785",
            assignedCourses: ["Circuit and Systems-2"]
        }
    ],
    admin: { 
        id: 999, 
        name: "Super Admin",
        email: "admin@ruet.ac.bd",
        phone: "+880123456799"
    },
    courses: ["Analog Electronics-1", "Object Oriented Programming", "Circuit and Systems-2", "Math", "Humanities"],
    courseCredits: [3, 3, 3, 3, 3]
};

// Current user state
let currentUser = null;
let currentRole = null;

// Initialize application
function initApp() {
    // Initialize counters
    animateCounters();
    
    // Load saved session if exists
    loadSession();
    
    // Set up event listeners
    setupEventListeners();
    
    // Update UI based on login state
    updateLoginUI();
    
    // Add clear button to login input
    addClearInputButton();
}

// Setup all event listeners
function setupEventListeners() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Main login buttons
    document.getElementById('studentLoginBtn')?.addEventListener('click', () => openLoginModal('student'));
    document.getElementById('teacherLoginBtn')?.addEventListener('click', () => openLoginModal('teacher'));
    document.getElementById('adminLoginBtn')?.addEventListener('click', () => openLoginModal('admin'));
    document.getElementById('loginBtn')?.addEventListener('click', () => {
        if (currentUser) {
            showDashboard();
        } else {
            openLoginModal('student');
        }
    });

    // Demo login buttons
    document.getElementById('demoStudentBtn')?.addEventListener('click', () => demoLogin('student', 2310047));
    document.getElementById('demoTeacherBtn')?.addEventListener('click', () => demoLogin('teacher', 100));
    document.getElementById('demoAdminBtn')?.addEventListener('click', () => demoLogin('admin', 999));

    // Action buttons
    document.getElementById('runConsoleBtn')?.addEventListener('click', showConsoleDemo);
    document.getElementById('exportDataBtn')?.addEventListener('click', exportSampleData);

    // Modal close buttons
    document.getElementById('closeModal')?.addEventListener('click', closeLoginModal);
    document.getElementById('closeStudentDashboard')?.addEventListener('click', () => closeModal('studentDashboard'));
    document.getElementById('closeTeacherDashboard')?.addEventListener('click', () => closeModal('teacherDashboard'));
    document.getElementById('closeAdminDashboard')?.addEventListener('click', () => closeModal('adminDashboard'));
    document.getElementById('closeGradesModal')?.addEventListener('click', () => closeModal('gradesModal'));
    document.getElementById('closeConsoleModal')?.addEventListener('click', () => closeModal('consoleModal'));

    // Role selection in login modal
    document.querySelectorAll('.role-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const role = this.dataset.role;
            selectRole(role);
        });
    });

    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }

    // Dashboard actions
    document.getElementById('registerCoursesBtn')?.addEventListener('click', registerCourses);
    document.getElementById('viewGradesBtn')?.addEventListener('click', viewGrades);
    document.getElementById('calculateCGPABtn')?.addEventListener('click', calculateCGPA);
    document.getElementById('viewProfileBtn')?.addEventListener('click', viewProfile);
    document.getElementById('logoutBtn')?.addEventListener('click', logout);

    // Teacher dashboard actions
    document.getElementById('gradeStudentsBtn')?.addEventListener('click', gradeStudents);
    document.getElementById('viewAllStudentsBtn')?.addEventListener('click', viewAllStudents);
    document.getElementById('updateProfileTeacherBtn')?.addEventListener('click', updateProfileTeacher);
    document.getElementById('logoutTeacherBtn')?.addEventListener('click', logout);

    // Admin dashboard actions
    document.getElementById('addStudentBtn')?.addEventListener('click', addNewStudent);
    document.getElementById('addTeacherBtn')?.addEventListener('click', addNewTeacher);
    document.getElementById('viewAllDataBtn')?.addEventListener('click', viewAllData);
    document.getElementById('exportAllDataBtn')?.addEventListener('click', exportAllData);
    document.getElementById('logoutAdminBtn')?.addEventListener('click', logout);

    // Console input
    const consoleInput = document.getElementById('consoleInput');
    if (consoleInput) {
        consoleInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleConsoleCommand(this.value);
                this.value = '';
            }
        });
    }

    // Close modals when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
            }
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                navLinks.classList.remove('active');
            }
        });
    });
}

// Load session from localStorage
function loadSession() {
    const savedUser = localStorage.getItem('currentUser');
    const savedRole = localStorage.getItem('currentRole');
    
    if (savedUser && savedRole) {
        currentUser = JSON.parse(savedUser);
        currentRole = savedRole;
    }
}

// Save session to localStorage
function saveSession() {
    if (currentUser && currentRole) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        localStorage.setItem('currentRole', currentRole);
    } else {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentRole');
    }
}

// Update login UI
function updateLoginUI() {
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        if (currentUser) {
            loginBtn.innerHTML = `<i class="fas fa-user"></i> ${currentUser.name}`;
        } else {
            loginBtn.innerHTML = `<i class="fas fa-sign-in-alt"></i> Login`;
        }
    }
}

// Add clear button to input
function addClearInputButton() {
    const userIdInput = document.getElementById('userId');
    const formGroup = userIdInput?.parentElement;
    
    if (userIdInput && formGroup) {
        // Remove existing clear button if any
        const existingClearBtn = formGroup.querySelector('.clear-input-btn');
        if (existingClearBtn) existingClearBtn.remove();
        
        // Add clear button
        const clearBtn = document.createElement('button');
        clearBtn.type = 'button';
        clearBtn.className = 'clear-input-btn';
        clearBtn.innerHTML = '<i class="fas fa-times"></i>';
        clearBtn.title = 'Clear input';
        
        clearBtn.addEventListener('click', function() {
            userIdInput.value = '';
            userIdInput.focus();
            this.style.display = 'none';
        });
        
        formGroup.appendChild(clearBtn);
        
        // Show/hide clear button based on input
        userIdInput.addEventListener('input', function() {
            clearBtn.style.display = this.value ? 'block' : 'none';
        });
        
        // Initialize visibility
        clearBtn.style.display = userIdInput.value ? 'block' : 'none';
    }
}

// Animate counters
function animateCounters() {
    const counters = [
        { element: document.getElementById('totalUsers'), value: systemData.totalUsers },
        { element: document.getElementById('totalStudents'), value: systemData.students.length },
        { element: document.getElementById('totalTeachers'), value: systemData.teachers.length }
    ];

    counters.forEach(counter => {
        if (counter.element) {
            animateCounter(counter.element, 0, counter.value, 2000);
        }
    });
}

function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    
    window.requestAnimationFrame(step);
}

// Modal functions
function openLoginModal(role = 'student') {
    const modal = document.getElementById('loginModal');
    if (modal) {
        selectRole(role);
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Clear the input field when opening modal
        const userIdInput = document.getElementById('userId');
        if (userIdInput) {
            userIdInput.value = '';
        }
    }
}

function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

function selectRole(role) {
    // Update role buttons
    document.querySelectorAll('.role-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.role === role) {
            btn.classList.add('active');
        }
    });
    
    // Update selected role display
    const roleSpan = document.querySelector('#selectedRole span');
    if (roleSpan) {
        roleSpan.textContent = role.charAt(0).toUpperCase() + role.slice(1);
    }
    
    // Update placeholder
    const userIdInput = document.getElementById('userId');
    if (userIdInput) {
        userIdInput.placeholder = `Enter ${role} ID`;
    }
}

// Login handling with input clearing
function handleLogin() {
    const userIdInput = document.getElementById('userId');
    const userId = userIdInput.value.trim();
    const role = document.querySelector('.role-btn.active').dataset.role;
    
    if (!userId) {
        showNotification('Please enter a valid ID', 'error');
        return;
    }
    
    // Convert to number for comparison
    const userIdNum = parseInt(userId);
    
    if (isNaN(userIdNum)) {
        showNotification('Please enter a numeric ID', 'error');
        return;
    }
    
    let user = null;
    
    switch(role) {
        case 'student':
            user = systemData.students.find(s => s.id === userIdNum);
            break;
        case 'teacher':
            user = systemData.teachers.find(t => t.id === userIdNum);
            break;
        case 'admin':
            if (systemData.admin.id === userIdNum) {
                user = systemData.admin;
            }
            break;
    }
    
    if (user) {
        currentUser = user;
        currentRole = role;
        saveSession();
        updateLoginUI();
        showNotification(`Welcome ${user.name}!`, 'success');
        
        // Clear the input field
        userIdInput.value = '';
        
        closeLoginModal();
        showDashboard();
    } else {
        showNotification('Invalid credentials', 'error');
    }
}

function demoLogin(role, id) {
    selectRole(role);
    const userIdInput = document.getElementById('userId');
    if (userIdInput) {
        userIdInput.value = id;
    }
    
    // Trigger login after a short delay
    setTimeout(() => {
        handleLogin();
    }, 100);
}

// Show dashboard based on role
function showDashboard() {
    if (!currentUser || !currentRole) return;
    
    // Close any open dashboards
    document.querySelectorAll('.dashboard-modal').forEach(modal => {
        modal.style.display = 'none';
    });
    
    switch(currentRole) {
        case 'student':
            showStudentDashboard();
            break;
        case 'teacher':
            showTeacherDashboard();
            break;
        case 'admin':
            showAdminDashboard();
            break;
    }
}

function showStudentDashboard() {
    const dashboard = document.getElementById('studentDashboard');
    const infoDiv = document.getElementById('studentInfo');
    
    if (infoDiv && currentUser) {
        const deptClass = `department-${currentUser.department?.toLowerCase() || 'cse'}`;
        
        infoDiv.innerHTML = `
            <div class="student-details">
                <div class="student-detail-item">
                    <span class="student-detail-label">Student ID</span>
                    <span class="student-detail-value">${currentUser.id}</span>
                </div>
                <div class="student-detail-item">
                    <span class="student-detail-label">Name</span>
                    <span class="student-detail-value">${currentUser.name}</span>
                </div>
                <div class="student-detail-item">
                    <span class="student-detail-label">Department</span>
                    <span class="student-detail-value">
                        <span class="department-badge ${deptClass}">${currentUser.department || 'CSE'}</span>
                    </span>
                </div>
                <div class="student-detail-item">
                    <span class="student-detail-label">Semester</span>
                    <span class="student-detail-value">${currentUser.semester}</span>
                </div>
                <div class="student-detail-item">
                    <span class="student-detail-label">Status</span>
                    <span class="student-detail-value ${currentUser.registered ? 'status-active' : 'status-inactive'}">
                        ${currentUser.registered ? 'Registered' : 'Not Registered'}
                    </span>
                </div>
            </div>
        `;
    }
    
    if (dashboard) {
        dashboard.style.display = 'block';
    }
}

function showTeacherDashboard() {
    const dashboard = document.getElementById('teacherDashboard');
    const infoDiv = document.getElementById('teacherInfo');
    
    if (infoDiv && currentUser) {
        const deptClass = `department-${currentUser.department?.toLowerCase() || 'cse'}`;
        
        infoDiv.innerHTML = `
            <div class="student-details">
                <div class="student-detail-item">
                    <span class="student-detail-label">Teacher ID</span>
                    <span class="student-detail-value">${currentUser.id}</span>
                </div>
                <div class="student-detail-item">
                    <span class="student-detail-label">Name</span>
                    <span class="student-detail-value">${currentUser.name}</span>
                </div>
                <div class="student-detail-item">
                    <span class="student-detail-label">Department</span>
                    <span class="student-detail-value">
                        <span class="department-badge ${deptClass}">${currentUser.department || 'CSE'}</span>
                    </span>
                </div>
                <div class="student-detail-item">
                    <span class="student-detail-label">Email</span>
                    <span class="student-detail-value">${currentUser.contact || 'N/A'}</span>
                </div>
            </div>
        `;
    }
    
    if (dashboard) {
        dashboard.style.display = 'block';
    }
}

function showAdminDashboard() {
    const dashboard = document.getElementById('adminDashboard');
    const infoDiv = document.getElementById('adminInfo');
    
    if (infoDiv && currentUser) {
        infoDiv.innerHTML = `
            <div class="student-details">
                <div class="student-detail-item">
                    <span class="student-detail-label">Admin ID</span>
                    <span class="student-detail-value">${currentUser.id}</span>
                </div>
                <div class="student-detail-item">
                    <span class="student-detail-label">Name</span>
                    <span class="student-detail-value">${currentUser.name}</span>
                </div>
                <div class="student-detail-item">
                    <span class="student-detail-label">Email</span>
                    <span class="student-detail-value">${currentUser.email}</span>
                </div>
                <div class="student-detail-item">
                    <span class="student-detail-label">Role</span>
                    <span class="student-detail-value">Super Administrator</span>
                </div>
            </div>
        `;
    }
    
    if (dashboard) {
        dashboard.style.display = 'block';
    }
}

// Student functions
function registerCourses() {
    if (!currentUser) return;
    
    if (currentUser.registered) {
        showNotification('You are already registered for courses!', 'error');
        return;
    }
    
    currentUser.registered = true;
    showNotification('Successfully registered for all courses!', 'success');
    updateStudentInfo();
}

function updateStudentInfo() {
    const infoDiv = document.getElementById('studentInfo');
    if (infoDiv && currentUser) {
        const deptClass = `department-${currentUser.department?.toLowerCase() || 'cse'}`;
        
        infoDiv.innerHTML = `
            <div class="student-details">
                <div class="student-detail-item">
                    <span class="student-detail-label">Student ID</span>
                    <span class="student-detail-value">${currentUser.id}</span>
                </div>
                <div class="student-detail-item">
                    <span class="student-detail-label">Name</span>
                    <span class="student-detail-value">${currentUser.name}</span>
                </div>
                <div class="student-detail-item">
                    <span class="student-detail-label">Department</span>
                    <span class="student-detail-value">
                        <span class="department-badge ${deptClass}">${currentUser.department || 'CSE'}</span>
                    </span>
                </div>
                <div class="student-detail-item">
                    <span class="student-detail-label">Semester</span>
                    <span class="student-detail-value">${currentUser.semester}</span>
                </div>
                <div class="student-detail-item">
                    <span class="student-detail-label">Status</span>
                    <span class="student-detail-value ${currentUser.registered ? 'status-active' : 'status-inactive'}">
                        ${currentUser.registered ? 'Registered' : 'Not Registered'}
                    </span>
                </div>
            </div>
        `;
    }
}

function viewGrades() {
    if (!currentUser) return;
    
    const gradesContent = document.getElementById('gradesContent');
    const gradesModal = document.getElementById('gradesModal');
    
    if (!gradesContent || !gradesModal) return;
    
    let html = `<h3><i class="fas fa-chart-bar"></i> Grades for ${currentUser.name}</h3>`;
    html += '<table class="grades-table">';
    html += '<thead><tr><th>Course</th><th>Marks</th><th>Grade</th><th>Credits</th></tr></thead>';
    html += '<tbody>';
    
    let totalPoints = 0;
    let totalCredits = 0;
    let allGraded = true;
    
    currentUser.marks.forEach((mark, index) => {
        let grade = 'N/A';
        let gradePoints = 0;
        
        if (mark !== -1) {
            if (mark >= 80) { grade = 'A+'; gradePoints = 4.0; }
            else if (mark >= 70) { grade = 'A'; gradePoints = 3.5; }
            else if (mark >= 60) { grade = 'B'; gradePoints = 3.0; }
            else if (mark >= 50) { grade = 'C'; gradePoints = 2.5; }
            else if (mark >= 40) { grade = 'D'; gradePoints = 2.0; }
            else { grade = 'F'; gradePoints = 0.0; }
            
            totalPoints += gradePoints * currentUser.credits[index];
            totalCredits += currentUser.credits[index];
        } else {
            allGraded = false;
        }
        
        html += `<tr>
            <td>${currentUser.courses[index]}</td>
            <td>${mark === -1 ? 'Not graded' : mark}</td>
            <td>${grade}</td>
            <td>${currentUser.credits[index]}</td>
        </tr>`;
    });
    
    html += '</tbody></table>';
    
    if (allGraded && totalCredits > 0) {
        const cgpa = (totalPoints / totalCredits).toFixed(2);
        html += `<div class="cgpa-display"><h4>CGPA: ${cgpa}/4.00</h4></div>`;
    }
    
    gradesContent.innerHTML = html;
    gradesModal.style.display = 'block';
}

function calculateCGPA() {
    if (!currentUser) return;
    
    let totalPoints = 0;
    let totalCredits = 0;
    let allGraded = true;
    
    currentUser.marks.forEach((mark, index) => {
        if (mark === -1) {
            allGraded = false;
        } else {
            let gradePoints = 0;
            if (mark >= 80) gradePoints = 4.0;
            else if (mark >= 70) gradePoints = 3.5;
            else if (mark >= 60) gradePoints = 3.0;
            else if (mark >= 50) gradePoints = 2.5;
            else if (mark >= 40) gradePoints = 2.0;
            
            totalPoints += gradePoints * currentUser.credits[index];
            totalCredits += currentUser.credits[index];
        }
    });
    
    if (!allGraded) {
        showNotification('All courses are not graded yet!', 'error');
    } else if (totalCredits === 0) {
        showNotification('No credits available!', 'error');
    } else {
        const cgpa = (totalPoints / totalCredits).toFixed(2);
        showNotification(`Your CGPA is: ${cgpa}/4.00`, 'success');
    }
}

// Fixed viewProfile function with proper spacing
function viewProfile() {
    if (!currentUser) return;
    
    const gradesContent = document.getElementById('gradesContent');
    const gradesModal = document.getElementById('gradesModal');
    
    if (!gradesContent || !gradesModal) return;
    
    // Get department badge class
    const deptClass = `department-${currentUser.department?.toLowerCase() || 'cse'}`;
    
    let html = `<h3><i class="fas fa-user-graduate"></i> Student Profile</h3>`;
    
    // Student details in a nice grid
    html += `<div class="student-details">`;
    html += `<div class="student-detail-item">
        <span class="student-detail-label">Student ID</span>
        <span class="student-detail-value">${currentUser.id}</span>
    </div>`;
    
    html += `<div class="student-detail-item">
        <span class="student-detail-label">Full Name</span>
        <span class="student-detail-value">${currentUser.name}</span>
    </div>`;
    
    html += `<div class="student-detail-item">
        <span class="student-detail-label">Department</span>
        <span class="student-detail-value">
            <span class="department-badge ${deptClass}">${currentUser.department || 'CSE'}</span>
        </span>
    </div>`;
    
    html += `<div class="student-detail-item">
        <span class="student-detail-label">Semester</span>
        <span class="student-detail-value">${currentUser.semester}</span>
    </div>`;
    
    html += `<div class="student-detail-item">
        <span class="student-detail-label">Email</span>
        <span class="student-detail-value">${currentUser.contact || 'Not provided'}</span>
    </div>`;
    
    html += `<div class="student-detail-item">
        <span class="student-detail-label">Phone</span>
        <span class="student-detail-value">${currentUser.phone || 'Not provided'}</span>
    </div>`;
    
    html += `<div class="student-detail-item">
        <span class="student-detail-label">Registration Status</span>
        <span class="student-detail-value ${currentUser.registered ? 'status-active' : 'status-inactive'}">
            ${currentUser.registered ? 'Registered ✓' : 'Not Registered'}
        </span>
    </div>`;
    html += `</div>`;
    
    if (currentUser.registered) {
        html += `<div class="courses-list">
            <h4><i class="fas fa-book"></i> Registered Courses</h4>`;
        
        currentUser.courses.forEach((course, index) => {
            html += `<div class="course-item">
                <span class="course-name">${course}</span>
                <span class="course-credits">${currentUser.credits[index]} Credits</span>
            </div>`;
        });
        
        html += `</div>`;
    }
    
    // Academic summary if registered
    if (currentUser.registered) {
        const allGraded = currentUser.marks.every(mark => mark !== -1);
        const gradedCourses = currentUser.marks.filter(mark => mark !== -1).length;
        
        html += `<div class="student-details">
            <div class="student-detail-item">
                <span class="student-detail-label">Courses Taken</span>
                <span class="student-detail-value">${currentUser.courses.length}</span>
            </div>
            <div class="student-detail-item">
                <span class="student-detail-label">Courses Graded</span>
                <span class="student-detail-value">${gradedCourses}/${currentUser.courses.length}</span>
            </div>
            <div class="student-detail-item">
                <span class="student-detail-label">Result Status</span>
                <span class="student-detail-value ${allGraded ? 'status-active' : 'status-pending'}">
                    ${allGraded ? 'Published' : 'Pending'}
                </span>
            </div>
        </div>`;
    }
    
    gradesContent.innerHTML = html;
    gradesModal.style.display = 'block';
}

// Teacher functions
function gradeStudents() {
    const contentDiv = document.getElementById('teacherDashboardContent');
    if (!contentDiv) return;
    
    let html = '<h3>Grade Students</h3>';
    html += '<div class="students-list">';
    
    systemData.students.forEach(student => {
        const deptClass = `department-${student.department?.toLowerCase() || 'cse'}`;
        html += `<div class="student-item">
            <div>
                <strong>${student.name}</strong>
                <p>ID: ${student.id} | <span class="department-badge ${deptClass}">${student.department}</span> - Semester ${student.semester}</p>
            </div>
            <div>
                <button onclick="openStudentGrading(${student.id})" class="grade-btn">
                    <i class="fas fa-edit"></i> Grade
                </button>
            </div>
        </div>`;
    });
    
    html += '</div>';
    contentDiv.innerHTML = html;
}

function openStudentGrading(studentId) {
    const student = systemData.students.find(s => s.id === studentId);
    if (!student) return;
    
    const contentDiv = document.getElementById('teacherDashboardContent');
    if (!contentDiv) return;
    
    const deptClass = `department-${student.department?.toLowerCase() || 'cse'}`;
    
    let html = `<h3>Grade: ${student.name}</h3>`;
    html += `<p>ID: ${student.id} | <span class="department-badge ${deptClass}">${student.department}</span> - Semester ${student.semester}</p>`;
    html += '<div class="grading-form">';
    
    student.courses.forEach((course, index) => {
        const currentMark = student.marks[index];
        html += `<div class="grade-item">
            <label>${course}</label>
            <input type="text" id="grade-${student.id}-${index}" 
                   value="${currentMark === -1 ? '' : currentMark}" 
                   placeholder="Enter marks (0-100)">
            <button onclick="saveGrade(${student.id}, ${index})">
                <i class="fas fa-save"></i> Save
            </button>
        </div>`;
    });
    
    html += '</div>';
    contentDiv.innerHTML = html;
}

function saveGrade(studentId, courseIndex) {
    const student = systemData.students.find(s => s.id === studentId);
    if (!student) return;
    
    const input = document.getElementById(`grade-${studentId}-${courseIndex}`);
    const mark = parseInt(input.value);
    
    if (isNaN(mark) || mark < 0 || mark > 100) {
        showNotification('Please enter a valid mark between 0 and 100', 'error');
        return;
    }
    
    student.marks[courseIndex] = mark;
    showNotification(`Grade saved for ${student.courses[courseIndex]}`, 'success');
    
    // Update current user if it's the same student
    if (currentUser && currentUser.id === studentId) {
        currentUser.marks[courseIndex] = mark;
        saveSession();
    }
}

function viewAllStudents() {
    const contentDiv = document.getElementById('teacherDashboardContent');
    if (!contentDiv) return;
    
    let html = '<h3>All Students</h3>';
    html += '<table class="grades-table">';
    html += '<thead><tr><th>ID</th><th>Name</th><th>Department</th><th>Semester</th><th>Status</th></tr></thead>';
    html += '<tbody>';
    
    systemData.students.forEach(student => {
        const deptClass = `department-${student.department?.toLowerCase() || 'cse'}`;
        html += `<tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td><span class="department-badge ${deptClass}">${student.department}</span></td>
            <td>${student.semester}</td>
            <td>${student.registered ? 'Registered' : 'Not Registered'}</td>
        </tr>`;
    });
    
    html += '</tbody></table>';
    contentDiv.innerHTML = html;
}

function updateProfileTeacher() {
    showNotification('Profile update feature coming soon!', 'info');
}

// Admin functions
function addNewStudent() {
    const contentDiv = document.getElementById('adminDashboardContent');
    if (!contentDiv) return;
    
const departments = [
    { code: 'CSE', name: 'Computer Science & Engineering' },
    { code: 'ECE', name: 'Electrical & Computer Engineering' },
    { code: 'EEE', name: 'Electrical & Electronic Engineering' },
    { code: 'ETE', name: 'Electronics & Telecommunication Engineering' },
    { code: 'MTE', name: 'Mechanical & Textile Engineering' },
    { code: 'MSE', name: 'Materials Science & Engineering' },
    { code: 'CME', name: 'Chemical Engineering' },
    { code: 'CE', name: 'Civil Engineering' },
    { code: 'ARCH', name: 'Architecture' }
];
    
    const html = `
        <h3><i class="fas fa-user-plus"></i> Add New Student</h3>
        <form id="addStudentForm" class="add-form">
            <div class="form-group">
                <label><i class="fas fa-id-card"></i> Student ID</label>
                <input type="text" id="newStudentId" required 
                       pattern="[0-9]{7}" 
                       title="7-digit Student ID"
                       placeholder="e.g., 2310047">
            </div>
            <div class="form-group">
                <label><i class="fas fa-user"></i> Full Name</label>
                <input type="text" id="newStudentName" required 
                       placeholder="Enter full name">
            </div>
            <div class="form-group">
                <label><i class="fas fa-building"></i> Department</label>
                <select id="newStudentDept" required>
                    <option value="">Select Department</option>
                    ${departments.map(dept => 
                        `<option value="${dept.code}">${dept.name} (${dept.code})</option>`
                    ).join('')}
                </select>
            </div>
            <div class="form-group">
                <label><i class="fas fa-graduation-cap"></i> Semester</label>
                <select id="newStudentSem" required>
                    <option value="">Select Semester</option>
                    ${Array.from({length: 8}, (_, i) => 
                        `<option value="${i+1}">Semester ${i+1}</option>`
                    ).join('')}
                </select>
            </div>
            <div class="form-group">
                <label><i class="fas fa-envelope"></i> Email</label>
                <input type="email" id="newStudentEmail" 
                       placeholder="student@ruet.ac.bd">
            </div>
            <div class="form-group">
                <label><i class="fas fa-phone"></i> Phone</label>
                <input type="tel" id="newStudentPhone" 
                       pattern="[0-9+]{11,15}"
                       placeholder="+8801XXXXXXXXX">
            </div>
            <button type="submit" class="btn-login-submit">
                <i class="fas fa-user-plus"></i> Add Student
            </button>
        </form>
    `;
    
    contentDiv.innerHTML = html;
    
    const form = document.getElementById('addStudentForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const newStudent = {
            id: parseInt(document.getElementById('newStudentId').value),
            name: document.getElementById('newStudentName').value.trim(),
            department: document.getElementById('newStudentDept').value,
            semester: parseInt(document.getElementById('newStudentSem').value),
            registered: false,
            marks: [-1, -1, -1, -1, -1],
            courses: [...systemData.courses],
            contact: document.getElementById('newStudentEmail').value.trim(),
            phone: document.getElementById('newStudentPhone').value.trim(),
            credits: [...systemData.courseCredits]
        };
        
        // Validation
        if (!newStudent.id || newStudent.id.toString().length !== 7) {
            showNotification('Student ID must be 7 digits!', 'error');
            return;
        }
        
        if (!newStudent.name) {
            showNotification('Please enter student name!', 'error');
            return;
        }
        
        if (!newStudent.department) {
            showNotification('Please select a department!', 'error');
            return;
        }
        
        if (!newStudent.semester || newStudent.semester < 1 || newStudent.semester > 12) {
            showNotification('Please select a valid semester (1-12)!', 'error');
            return;
        }
        
        // Check if ID already exists
        if (systemData.students.some(s => s.id === newStudent.id)) {
            showNotification('Student ID already exists!', 'error');
            return;
        }
        
        systemData.students.push(newStudent);
        systemData.totalUsers++;
        
        // Update counters
        document.getElementById('totalUsers').textContent = systemData.totalUsers;
        document.getElementById('totalStudents').textContent = systemData.students.length;
        
        showNotification(`Student ${newStudent.name} (${newStudent.department}) added successfully!`, 'success');
        
        // Clear form
        this.reset();
    });
}

function addNewTeacher() {
    const contentDiv = document.getElementById('adminDashboardContent');
    if (!contentDiv) return;
    
    const departments = [
        { code: 'CSE', name: 'Computer Science & Engineering' },
        { code: 'ECE', name: 'Electrical & Computer Engineering' },
        { code: 'EEE', name: 'Electrical & Electronic Engineering' },
        { code: 'ETE', name: 'Electronics & Telecommunication Engineering' },
        { code: 'MTE', name: 'Mechanical & Textile Engineering' },
        { code: 'MSE', name: 'Materials Science & Engineering' },
        { code: 'CME', name: 'Chemical Engineering' },
        { code: 'CE', name: 'Civil Engineering' },
        { code: 'ARCH', name: 'Architecture' }
    ];
    
    const html = `
        <h3><i class="fas fa-user-plus"></i> Add New Teacher</h3>
        <form id="addTeacherForm" class="add-form">
            <div class="form-group">
                <label><i class="fas fa-id-card"></i> Teacher ID</label>
                <input type="text" id="newTeacherId" required 
                       pattern="[0-9]{3,4}" 
                       title="3-4 digit Teacher ID"
                       placeholder="e.g., 100">
            </div>
            <div class="form-group">
                <label><i class="fas fa-user"></i> Full Name</label>
                <input type="text" id="newTeacherName" required 
                       placeholder="Enter full name with title">
            </div>
            <div class="form-group">
                <label><i class="fas fa-building"></i> Department</label>
                <select id="newTeacherDept" required>
                    <option value="">Select Department</option>
                    ${departments.map(dept => 
                        `<option value="${dept.code}">${dept.name} (${dept.code})</option>`
                    ).join('')}
                </select>
            </div>
            <div class="form-group">
                <label><i class="fas fa-envelope"></i> Email</label>
                <input type="email" id="newTeacherEmail" required
                       placeholder="teacher@ruet.ac.bd">
            </div>
            <div class="form-group">
                <label><i class="fas fa-phone"></i> Phone</label>
                <input type="tel" id="newTeacherPhone" 
                       pattern="[0-9+]{11,15}"
                       placeholder="+8801XXXXXXXXX">
            </div>
            <button type="submit" class="btn-login-submit">
                <i class="fas fa-user-plus"></i> Add Teacher
            </button>
        </form>
    `;
    
    contentDiv.innerHTML = html;
    
    const form = document.getElementById('addTeacherForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const newTeacher = {
            id: parseInt(document.getElementById('newTeacherId').value),
            name: document.getElementById('newTeacherName').value.trim(),
            department: document.getElementById('newTeacherDept').value,
            contact: document.getElementById('newTeacherEmail').value.trim(),
            phone: document.getElementById('newTeacherPhone').value.trim(),
            assignedCourses: [...systemData.courses]
        };
        
        // Validation
        if (!newTeacher.id) {
            showNotification('Please enter valid teacher ID!', 'error');
            return;
        }
        
        if (!newTeacher.name) {
            showNotification('Please enter teacher name!', 'error');
            return;
        }
        
        if (!newTeacher.department) {
            showNotification('Please select a department!', 'error');
            return;
        }
        
        if (!newTeacher.contact || !isValidEmail(newTeacher.contact)) {
            showNotification('Please enter valid email!', 'error');
            return;
        }
        
        // Check if ID already exists
        if (systemData.teachers.some(t => t.id === newTeacher.id)) {
            showNotification('Teacher ID already exists!', 'error');
            return;
        }
        
        systemData.teachers.push(newTeacher);
        systemData.totalUsers++;
        
        // Update counters
        document.getElementById('totalUsers').textContent = systemData.totalUsers;
        document.getElementById('totalTeachers').textContent = systemData.teachers.length;
        
        showNotification(`Teacher ${newTeacher.name} (${newTeacher.department}) added successfully!`, 'success');
        
        // Clear form
        this.reset();
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function viewAllData() {
    const contentDiv = document.getElementById('adminDashboardContent');
    if (!contentDiv) return;
    
    let html = '<h3>System Data Overview</h3>';
    
    // Students section
    html += '<h4>Students (' + systemData.students.length + ')</h4>';
    html += '<div class="data-section">';
    systemData.students.forEach(student => {
        const deptClass = `department-${student.department?.toLowerCase() || 'cse'}`;
        html += `<div class="data-item">
            <strong>${student.name}</strong> (ID: ${student.id})
            <br><span class="department-badge ${deptClass}">${student.department}</span> | Semester: ${student.semester}
            <br>Status: ${student.registered ? 'Registered' : 'Not Registered'}
        </div>`;
    });
    html += '</div>';
    
    // Teachers section
    html += '<h4>Teachers (' + systemData.teachers.length + ')</h4>';
    html += '<div class="data-section">';
    systemData.teachers.forEach(teacher => {
        const deptClass = `department-${teacher.department?.toLowerCase() || 'cse'}`;
        html += `<div class="data-item">
            <strong>${teacher.name}</strong> (ID: ${teacher.id})
            <br><span class="department-badge ${deptClass}">${teacher.department}</span>
            <br>Email: ${teacher.contact || 'N/A'} | Phone: ${teacher.phone || 'N/A'}
        </div>`;
    });
    html += '</div>';
    
    // Courses section
    html += '<h4>Courses (' + systemData.courses.length + ')</h4>';
    html += '<div class="data-section">';
    systemData.courses.forEach((course, index) => {
        html += `<div class="data-item">
            <strong>${course}</strong> - ${systemData.courseCredits[index]} credits
        </div>`;
    });
    html += '</div>';
    
    contentDiv.innerHTML = html;
}

function exportAllData() {
    // Create CSV data for students
    let studentCSV = 'ID,Name,Department,Semester,Registered,Course1_Marks,Course2_Marks,Course3_Marks,Course4_Marks,Course5_Marks\n';
    systemData.students.forEach(student => {
        studentCSV += `${student.id},${student.name},${student.department},${student.semester},${student.registered},${student.marks.join(',')}\n`;
    });
    
    // Create CSV data for teachers
    let teacherCSV = 'ID,Name,Department,Email,Phone\n';
    systemData.teachers.forEach(teacher => {
        teacherCSV += `${teacher.id},${teacher.name},${teacher.department},${teacher.contact || ''},${teacher.phone || ''}\n`;
    });
    
    // Create CSV data for courses
    let courseCSV = 'Course,Credits\n';
    systemData.courses.forEach((course, index) => {
        courseCSV += `${course},${systemData.courseCredits[index]}\n`;
    });
    
    // Create download links
    downloadCSV('students.csv', studentCSV);
    setTimeout(() => {
        downloadCSV('teachers.csv', teacherCSV);
        setTimeout(() => {
            downloadCSV('courses.csv', courseCSV);
            showNotification('All data exported successfully!', 'success');
        }, 300);
    }, 300);
}

function downloadCSV(filename, content) {
    const blob = new Blob([content], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function exportSampleData() {
    const sampleData = `ID,Name,Department,Semester,Registered
2310047,Mustakim Ahmed,CSE,3,No
2310048,John Doe,EEE,3,Yes
2310049,Jane Smith,ETE,4,Yes`;
    
    downloadCSV('sample_students.csv', sampleData);
    showNotification('Sample data exported! Check downloads folder.', 'success');
}

// Console Demo
function showConsoleDemo() {
    const consoleModal = document.getElementById('consoleModal');
    const consoleOutput = document.getElementById('consoleOutput');
    
    if (consoleModal && consoleOutput) {
        consoleOutput.innerHTML = `
            <div class="console-line">=== RUET Student Management System ===</div>
            <div class="console-line">Loading system data...</div>
            <div class="console-line">[SUCCESS] Loaded ${systemData.students.length} students</div>
            <div class="console-line">[SUCCESS] Loaded ${systemData.teachers.length} teachers</div>
            <div class="console-line">=== Main Menu ===</div>
            <div class="console-line">1) Student Login</div>
            <div class="console-line">2) Teacher Login</div>
            <div class="console-line">3) Admin Login</div>
            <div class="console-line">4) Exit</div>
            <div class="console-line">Enter your choice (1-4):</div>
        `;
        
        consoleModal.style.display = 'block';
        document.getElementById('consoleInput')?.focus();
    }
}

function handleConsoleCommand(command) {
    const consoleOutput = document.getElementById('consoleOutput');
    if (!consoleOutput) return;
    
    // Add the command to output
    consoleOutput.innerHTML += `<div class="console-line">> ${command}</div>`;
    
    // Process command
    command = command.toLowerCase().trim();
    
    switch(command) {
        case '1':
        case 'student':
            consoleOutput.innerHTML += `<div class="console-line">Enter Student ID: 2310047</div>`;
            consoleOutput.innerHTML += `<div class="console-line">Login successful! Welcome Mustakim Ahmed</div>`;
            consoleOutput.innerHTML += `<div class="console-line">=== Student Menu ===</div>`;
            consoleOutput.innerHTML += `<div class="console-line">1) Register Courses</div>`;
            consoleOutput.innerHTML += `<div class="console-line">2) View Grades</div>`;
            consoleOutput.innerHTML += `<div class="console-line">3) Calculate CGPA</div>`;
            consoleOutput.innerHTML += `<div class="console-line">4) Logout</div>`;
            break;
            
        case '2':
        case 'teacher':
            consoleOutput.innerHTML += `<div class="console-line">Enter Teacher ID: 100</div>`;
            consoleOutput.innerHTML += `<div class="console-line">Login successful! Welcome Dr. Kim Jung</div>`;
            consoleOutput.innerHTML += `<div class="console-line">=== Teacher Menu ===</div>`;
            consoleOutput.innerHTML += `<div class="console-line">1) Grade Students</div>`;
            consoleOutput.innerHTML += `<div class="console-line">2) View All Students</div>`;
            consoleOutput.innerHTML += `<div class="console-line">3) Logout</div>`;
            break;
            
        case '3':
        case 'admin':
            consoleOutput.innerHTML += `<div class="console-line">Enter Admin ID: 999</div>`;
            consoleOutput.innerHTML += `<div class="console-line">Login successful! Welcome Super Admin</div>`;
            consoleOutput.innerHTML += `<div class="console-line">=== Admin Menu ===</div>`;
            consoleOutput.innerHTML += `<div class="console-line">1) View System Statistics</div>`;
            consoleOutput.innerHTML += `<div class="console-line">2) Add New Student</div>`;
            consoleOutput.innerHTML += `<div class="console-line">3) Add New Teacher</div>`;
            consoleOutput.innerHTML += `<div class="console-line">4) Export All Data</div>`;
            consoleOutput.innerHTML += `<div class="console-line">5) Logout</div>`;
            break;
            
        case '4':
        case 'exit':
            consoleOutput.innerHTML += `<div class="console-line">Exiting system... Goodbye!</div>`;
            setTimeout(() => {
                closeModal('consoleModal');
            }, 1000);
            break;
            
        case 'help':
                        consoleOutput.innerHTML += `<div class="console-line">Available commands:</div>`;
            consoleOutput.innerHTML += `<div class="console-line">  student / 1 - Login as student</div>`;
            consoleOutput.innerHTML += `<div class="console-line">  teacher / 2 - Login as teacher</div>`;
            consoleOutput.innerHTML += `<div class="console-line">  admin / 3 - Login as admin</div>`;
            consoleOutput.innerHTML += `<div class="console-line">  exit / 4 - Exit system</div>`;
            consoleOutput.innerHTML += `<div class="console-line">  help - Show this help</div>`;
            consoleOutput.innerHTML += `<div class="console-line">  clear - Clear console</div>`;
            break;
            
        case 'clear':
            consoleOutput.innerHTML = '';
            break;
            
        case 'stats':
            consoleOutput.innerHTML += `<div class="console-line">=== System Statistics ===</div>`;
            consoleOutput.innerHTML += `<div class="console-line">Total Users: ${systemData.totalUsers}</div>`;
            consoleOutput.innerHTML += `<div class="console-line">Students: ${systemData.students.length}</div>`;
            consoleOutput.innerHTML += `<div class="console-line">Teachers: ${systemData.teachers.length}</div>`;
            consoleOutput.innerHTML += `<div class="console-line">Courses: ${systemData.courses.length}</div>`;
            break;
            
        default:
            consoleOutput.innerHTML += `<div class="console-line">Unknown command: ${command}. Type 'help' for available commands.</div>`;
    }
    
    // Scroll to bottom
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

// Logout function with input clearing
function logout() {
    // Clear current user
    currentUser = null;
    currentRole = null;
    
    // Clear saved session
    saveSession();
    
    // Update login UI
    updateLoginUI();
    
    // Clear login input field
    const userIdInput = document.getElementById('userId');
    if (userIdInput) {
        userIdInput.value = '';
        
        // Hide clear button
        const clearBtn = userIdInput.parentElement.querySelector('.clear-input-btn');
        if (clearBtn) {
            clearBtn.style.display = 'none';
        }
    }
    
    // Close all dashboards
    document.querySelectorAll('.dashboard-modal').forEach(modal => {
        modal.style.display = 'none';
    });
    
    // Close all other modals
    document.querySelectorAll('.modal:not(#loginModal)').forEach(modal => {
        modal.style.display = 'none';
    });
    
    showNotification('Logged out successfully!', 'success');
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'exclamation-circle';
    
    notification.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 3000);
}

// Additional CSS for dynamic elements
const style = document.createElement('style');
style.textContent = `
    .user-info {
        background-color: #f8f9fa;
        padding: 1rem;
        border-radius: 8px;
        margin: 1rem 0;
    }
    
    .user-info p {
        margin: 0.5rem 0;
    }
    
    .students-list {
        margin-top: 1rem;
    }
    
    .student-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background-color: white;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        margin-bottom: 0.5rem;
    }
    
    .grade-btn {
        background-color: var(--secondary-color);
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 5px;
    }
    
    .grading-form {
        margin-top: 1rem;
    }
    
    .grade-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
        padding: 1rem;
        background-color: white;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
    }
    
    .grade-item label {
        flex: 1;
        font-weight: 500;
    }
    
    .grade-item input {
        width: 80px;
        padding: 0.5rem;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
    
    .grade-item button {
        background-color: var(--success-color);
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 5px;
    }
    
    .data-section {
        margin-bottom: 2rem;
        padding: 1rem;
        background-color: white;
        border-radius: 8px;
        border: 1px solid #e0e0e0;
    }
    
    .data-item {
        padding: 0.5rem 0;
        border-bottom: 1px solid #eee;
    }
    
    .data-item:last-child {
        border-bottom: none;
    }
    
    .cgpa-display {
        margin-top: 1rem;
        padding: 1rem;
        background-color: var(--light-color);
        border-radius: 8px;
        text-align: center;
    }
    
    .cgpa-display h4 {
        margin: 0;
        color: var(--success-color);
    }
    
    .profile-info {
        padding: 2rem;
        background-color: white;
        border-radius: 8px;
        border: 1px solid #e0e0e0;
        margin: 1rem 0;
        line-height: 1.8;
    }
    
    .profile-info p {
        margin: 1rem 0;
        padding: 0.5rem 0;
        border-bottom: 1px solid #f0f0f0;
    }
    
    .profile-info p:last-child {
        border-bottom: none;
    }
    
    .profile-info h4 {
        margin-top: 1.5rem;
        margin-bottom: 1rem;
        color: var(--primary-color);
    }
    
    .profile-info ul {
        list-style-type: none;
        padding-left: 1rem;
    }
    
    .profile-info li {
        padding: 0.5rem 0;
        border-bottom: 1px solid #f8f8f8;
    }
    
    .profile-info li:last-child {
        border-bottom: none;
    }
`;
document.head.appendChild(style);
