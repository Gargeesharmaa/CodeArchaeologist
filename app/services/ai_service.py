from app.ai.workflow import analyze


class AIService:

    def analyze_repository(self, parsed_files, graph_data):

        return analyze(
            parsed_files,
            graph_data,
        )