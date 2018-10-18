def docker_hub_username = 'depauna'
def img_name = 'book-store'
def img_tag = 'user1'

def userName = 'user1'

pipeline {
    agent { label 'master' }
    stages {
        stage('Built image') {
            steps {
                sh "docker build . --build-arg var=user1 -t ${docker_hub_username}/${img_name}:${img_tag}"
            }
        }
        stage('Push image to Docker Hub') {
            steps {
                withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'Dockerhub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
                    sh "docker login -u $USERNAME -p $PASSWORD"
                    sh "docker push ${docker_hub_username}/${img_name}:${img_tag}"
                    sh "docker logout"
                }
            }
        }
//         stage('Deploy book-store helm chart') {
//            steps {
//                    sh "helm ls --tls --tls-ca-cert ~/.helm/ca.pem --tls-cert ~/.helm/cert.pem --tls-key ~/.helm/key.pem"
//                    sh "(git clone https://github.com/depauna/meetup-resources.git || cd meetup-resources && git reset --hard && git pull origin master)"
//                    sh "chmod u+x /var/jenkins_home/workspace/book-store/meetup-resources/meetup-resources/deployapp.sh && /var/jenkins_home/workspace/book-store/meetup-resources/meetup-resources/deployapp.sh ${docker_hub_username} ${img_name} ${img_tag} ${userName}
//            }
//        }
    }
}
