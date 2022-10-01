# MongoDB 와 Redis를 도커 컨테이너로 실행
docker-compose up -d

sleep 10

# Docker 로 추가된 로컬 MongoDB를 ReplicaSet 환경 구성을 위해 실행 필요한 배치 파일
# Transaction 적용을 위해, 로컬 DB에도 ReplicaSet 설정이 필요
docker-compose exec mongo /usr/bin/mongo --eval '''if (rs.status()["ok"] == 0) {
 rsconf = {
   _id : "rs0",
   members: [
     { _id : 0, host : "mongo:27017" },
   ]
 };
 rs.initiate(rsconf);
}
rs.conf();'''