from collections import defaultdict


class ContextBuilder:

    @staticmethod
    def build(parsed_files, graph_data):

        files = []
        classes = []
        functions = []
        imports = set()

        for file in parsed_files:

            metadata = file.get("metadata", {})

            files.append({
                "path": file.get("path"),
                "language": file.get("language"),
            })

            classes.extend(metadata.get("classes", []))
            functions.extend(metadata.get("functions", []))
            imports.update(metadata.get("imports", []))

        return {
            "repository": {
                "total_files": len(parsed_files),
                "total_classes": len(classes),
                "total_functions": len(functions),
            },
            "files": files,
            "classes": classes,
            "functions": functions,
            "imports": sorted(list(imports)),
            "graph": graph_data,
            "source_files": parsed_files,
        }