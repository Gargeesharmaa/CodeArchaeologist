DEPENDENCY_PROMPT = """
You are a senior software architect.

Analyze the dependency graph of this repository.

Explain:

1. Internal module dependencies
2. External libraries used
3. Highly connected modules
4. Circular dependencies (if any)
5. Dependency issues
6. Suggestions to improve modularity

Return the analysis in concise markdown.
"""