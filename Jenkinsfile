pipeline {
    agent any

    tools {
        nodejs "NodeJS_20"
    }

    environment {
        BUILD_DIR = "/build/workspace/${env.JOB_NAME}"
    }

    stages {
        stage('Przygotowanie') {
            steps {
                // Tworzymy katalog na build, kopiujemy tam repo
                sh "mkdir -p ${BUILD_DIR}"
                sh "rsync -a \$WORKSPACE/ ${BUILD_DIR}/"
            }
        }

        stage('Instalacja zależności Node.js') {
            steps {
                dir("${BUILD_DIR}") {
                    sh 'npm install'
                }
            }
        }

        stage('Budowanie aplikacji frontend') {
            steps {
                dir("${BUILD_DIR}") {
                    sh 'npm run build'
                }
            }
        }

        stage('Archiwizacja') {
            steps {
                dir("${BUILD_DIR}") {
                    sh 'tar -czf dist.tar.gz dist/'
                    archiveArtifacts artifacts: 'dist.tar.gz', fingerprint: true
                }
            }
        }

        stage('Budowanie obrazu Docker') {
            steps {
                dir("${BUILD_DIR}") {
                    sh 'docker build -t pogoda .'
                }
            }
        }

        stage('Test (symulowany)') {
            steps {
                echo 'Testy OK'
            }
        }

        stage('Uruchomienie kontenera') {
            steps {
                sh 'docker rm -f app || true'
                sh 'docker run -d --name app --network projekt_ci-net -p 5000:5000 pogoda'
            }
        }
    }
}
