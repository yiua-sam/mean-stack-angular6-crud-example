def icp_dev_registry = 'mycluster.icp:8500'

def img_group_name = 'jenkins'
def img_name = 'book-store'
def img_tag = '1'

pipeline {
    agent { label 'master' }
    stages {
        stage('Push to cluster-dev docker registry') {
            steps {
                sh "docker build . -t ${icp_dev_registry}/${img_group_name}/${img_name}:${img_tag}"
                sh "docker push ${icp_dev_registry}/${img_group_name}/${img_name}:${img_tag}"
            }
        }
    }
}
