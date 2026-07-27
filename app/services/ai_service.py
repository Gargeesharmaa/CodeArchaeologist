
class AIService:

    def analyze_repository(
        self,
        parsed_files: list,
        graph_data: dict,
    ):

        return {
            "summary": "Repository analyzed successfully.",
            "total_files": len(parsed_files),
            "total_nodes": len(graph_data["nodes"]),
            "total_edges": len(graph_data["edges"]),
        }