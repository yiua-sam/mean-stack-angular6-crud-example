def docker_hub_username = 'depauna'
def img_name = 'book-store'
def img_tag = 'latest'

def icp_dev_registry = 'mycluster.icp:8500'
def img_group_name = 'jenkins'

def firstName = 'Natan'
def lastName = 'Depauw'

pipeline {
    agent { label 'master' }
    stages {
        stage('Built image') {
            steps {
                sh "docker build . -t ${docker_hub_username}/${img_name}:${img_tag}"
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
        stage('Deploy book-store helm chart') {
            steps {
                withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'ICP', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
                    sh "bx pr login -a https://192.168.56.150:8443 --skip-ssl-validation -u $USERNAME -p $PASSWORD -c id-mycluster-account"
                    sh "bx pr cluster-config mycluster"
                    sh "helm ls --tls --tls-ca-cert ~/.helm/ca.pem --tls-cert ~/.helm/cert.pem --tls-key ~/.helm/key.pem"
                    sh "cd /opt"
                    sh "git init ."
                    sh "git remote add -t \* -f origin  https://github.com/depauna/meetup-resources.git"
                    sh "git checkout master"
                    sh "chmod u+x /opt/meetup-resources/deployapp.sh && /opt/meetup-resources/meetup-resources/deployapp.sh ${docker_hub_username} ${img_name} ${img_tag} ${firstName} ${lastName}"
                }
            }
        }
//        stage('Tag and push image for local ICP cluster') {
//            steps {
//                sh "docker tag ${docker_hub_username}/${img_name}:${img_tag} ${icp_dev_registry}/${img_group_name}/${img_name}:${img_tag}"
//                sh "docker push ${icp_dev_registry}/${img_group_name}/${img_name}:${img_tag}"
//            }
//        }
    }
}
