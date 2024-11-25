
        const container = document.getElementById('container');
        const registerBtn = document.getElementById('register');
        const loginBtn = document.getElementById('login');
        const signInForm = document.getElementById('signInForm');
        const emailOrPhone = document.getElementById('emailOrPhone');
        const password = document.getElementById('password');
        const submitBtn = document.getElementById('submitBtn');
        const registerForm = document.getElementById('registerForm');

        registerBtn.addEventListener('click', () => {
            container.classList.add("active");
        });

        loginBtn.addEventListener('click', () => {
            container.classList.remove("active");
        });

        // Add password strength meter
        function updatePasswordStrength(password) {
            const strengthIndicator = document.getElementById('passwordStrength');
            let strength = 'Weak';
            if (password.length >= 8) {
                if (/[A-Z]/.test(password) && /\d/.test(password) && /[^A-Za-z0-9]/.test(password)) {
                    strength = 'Strong';
                } else {
                    strength = 'Medium';
                }
            }
            strengthIndicator.textContent = `Strength: ${strength}`;
        }

        document.getElementById('registerPassword').addEventListener('input', function () {
            updatePasswordStrength(this.value);
        });

        // Show/Hide Password Functionality
        document.getElementById('toggleRegisterPassword').addEventListener('click', function () {
            const registerPasswordInput = document.getElementById('registerPassword');
            const icon = document.getElementById('registerPasswordIcon');
            if (registerPasswordInput.type === 'password') {
                registerPasswordInput.type = 'text';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            } else {
                registerPasswordInput.type = 'password';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            }
        });

        document.getElementById('toggleSignInPassword').addEventListener('click', function () {
            const passwordInput = document.getElementById('password');
            const icon = document.getElementById('signInPasswordIcon');
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            }
        });

        // Form submission for Sign In
        signInForm.addEventListener('submit', function (event) {
            event.preventDefault();

            if (!emailOrPhone.value.trim() || !password.value.trim()) {
                showToast('Please fill in all fields correctly', 'danger');
                shakeElement(emailOrPhone);
                shakeElement(password);
                return; // Stop form submission
            }

            // If all fields are filled and valid, simulate sign-in success
            showToast('Sign-in successful!', 'success');
            signInForm.reset();
        });

        // Form submission for Sign Up
        registerForm.addEventListener('submit', function (event) {
            event.preventDefault();

            // Get all required inputs
            const name = document.querySelector('input[placeholder="Name"]');
            const email = document.querySelector('input[placeholder="Email"]');
            const password = document.getElementById('registerPassword');

            // Check if any required fields are empty
            if (!name.value.trim() || !email.value.trim() || !password.value.trim()) {
                showToast('Please fill in all required fields.', 'danger');
                shakeElement(name);
                shakeElement(email);
                shakeElement(password);
                return; // Stop form submission
            }

            // Check password strength
            if (!validatePassword(password.value)) {
                showToast('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.', 'danger');
                shakeElement(password);
                return; // Stop form submission
            }

            // If all fields are filled and valid, simulate sign-up success
            showToast('Sign-up successful!', 'success');
            registerForm.reset();
        });

        // Shake animation for invalid fields
        function shakeElement(element) {
            element.classList.add('shake');
            element.addEventListener('animationend', () => {
                element.classList.remove('shake');
            }, {once: true});
        }

        // Toast notification function
        function showToast(message, type) {
            const toastContainer = document.createElement('div');
            toastContainer.style.position = 'fixed';
            toastContainer.style.top = '20px';
            toastContainer.style.right = '20px';
            toastContainer.style.zIndex = '1050';
            
            const toast = document.createElement('div');
            toast.className = `toast align-items-center text-white bg-${type} border-0`;
            toast.setAttribute('role', 'alert');
            toast.setAttribute('aria-live', 'assertive');
            toast.setAttribute('aria-atomic', 'true');
            
            toast.innerHTML = `
                <div class="d-flex">
                    <div class="toast-body">
                        ${message}
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
                </div>
            `;
            
            toastContainer.appendChild(toast);
            document.body.appendChild(toastContainer);
            
            const bsToast = new bootstrap.Toast(toast);
            bsToast.show();
            
            toast.addEventListener('hidden.bs.toast', () => {
                toastContainer.remove();
            });
        }

        // Password strength validation
        function validatePassword(password) {
            const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/; // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
            return regex.test(password);
        }

    