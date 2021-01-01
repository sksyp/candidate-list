import http from "../services/http_service";

class CandidateService {
  getAllCandidates() {
    return http.get("/users49b8675.json");
  }
}

export default new CandidateService();
