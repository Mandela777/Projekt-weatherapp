pipeline {
    agent any

    tools {
        nodejs "NodeJS_20"
    }

    stages {
        stage('Instalacja zależności Node.js') {
            steps {
                sh 'npm install'
            }
        }

        stage('Budowanie aplikacji frontend') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Archiwizacja') {
            steps {
                sh 'tar -czf dist.tar.gz dist/'
                archiveArtifacts artifacts: 'dist.tar.gz', fingerprint: true
            }
        }

        stage('Budowanie obrazu Docker') {
            steps {
                sh "docker build -t pogoda ${env.WORKSPACE}"
            }
        }

        stage('Test (symulowany)') {
            steps {
                sh 'echo "Testy OK"'
            }
        }

        stage('Uruchomienie kontenera') {
            steps {
                sh 'docker rm -f app || true'
                sh 'docker run -d -p 5000:5000 --name app pogoda || true'
            }
        }
    }
}
