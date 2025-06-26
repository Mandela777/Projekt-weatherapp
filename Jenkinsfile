pipeline {
    agent any
    stages {
        stage('Klonowanie') {
            steps {
                git 'https://github.com/Mandela777/Projekt-weatherapp'
            }
        }
        stage('Budowanie obrazu') {
            steps {
                sh 'docker build -t pogoda .'
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
