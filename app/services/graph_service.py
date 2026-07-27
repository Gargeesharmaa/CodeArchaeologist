import ast
import networkx as nx


class GraphService:

    def build_graph(self, parsed_files: list[dict]) -> dict:
        graph = nx.DiGraph()

        for file in parsed_files:

            file_path = file["path"]
            metadata = file["metadata"]

            graph.add_node(
                file_path,
                type="file",
                lines=file["lines"],
                size=file["size"],
            )

            for imported_module in metadata["imports"]:
                graph.add_node(
                    imported_module,
                    type="module",
                )

                graph.add_edge(
                    file_path,
                    imported_module,
                    relation="imports",
                )

        return {
            "nodes": self._serialize_nodes(graph),
            "edges": self._serialize_edges(graph),
        }

    def _serialize_nodes(self, graph):

        nodes = []

        for node, attributes in graph.nodes(data=True):

            nodes.append(
                {
                    "id": node,
                    **attributes,
                }
            )

        return nodes

    def _serialize_edges(self, graph):

        edges = []

        for source, target, attributes in graph.edges(data=True):

            edges.append(
                {
                    "source": source,
                    "target": target,
                    **attributes,
                }
            )

        return edges