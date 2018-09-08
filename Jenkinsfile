def icp_dev_registry = 'mycluster.icp:8500'

def img_group_name = 'jenkins'
def img_name = 'book-store'
def img_tag = '4'

pipeline {
    agent { label 'master' }
    stages {
        stage('Push to cluster-dev docker registry') {
            steps {
                sh "sudo docker build . -t ${icp_dev_registry}/${img_group_name}/${img_name}:${img_tag}"
                sh "sudo docker push ${icp_dev_registry}/${img_group_name}/${img_name}:${img_tag}"
                sh "sudo docker tag ${icp_dev_registry}/${img_group_name}/${img_name}:${img_tag} depauna/book-store:1"
                sh "sudo docker push depauna/book-store:1"                
            }
        }
    }
}
