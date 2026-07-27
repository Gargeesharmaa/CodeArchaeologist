from pathlib import Path

from app.services.git_service import GitService
from app.services.parser_service import ParserService
from app.services.graph_service import GraphService
from app.services.ai_service import AIService


class PipelineService:

    def __init__(self):
        self.git_service = GitService()
        self.parser_service = ParserService()
        self.graph_service = GraphService()
        self.ai_service = AIService()

    def analyze_repository(
        self,
        repo_url: str,
        branch: str = "main",
    ) -> dict:

        repo_path: Path | None = None

        try:
            # Step 1: Clone repository
            repo_path = self.git_service.clone_repository(
                repo_url,
                branch,
            )

            # Step 2: Parse repository
            parsed_files = self.parser_service.parse_repository(
                repo_path
            )

            # Step 3: Build dependency graph
            graph_data = self.graph_service.build_graph(
                parsed_files
            )

            # Step 4: AI Analysis
            ai_result = self.ai_service.analyze_repository(
                parsed_files,
                graph_data,
            )

            return {
                "repository": repo_url,
                "branch": branch,
                "files": len(parsed_files),
                "graph": graph_data,
                "analysis": ai_result,
            }

        finally:
            if repo_path:
                self.git_service.delete_repository(repo_path)