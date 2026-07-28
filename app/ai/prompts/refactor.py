REFACTOR_PROMPT = """
You are a Senior Software Engineer.

Analyze this repository.

Identify:

1. Code smells
2. Duplicate code
3. Large classes
4. Large functions
5. High complexity
6. Poor naming
7. Dead code
8. Tight coupling
9. Low cohesion
10. SOLID principle violations

For every issue provide:

- title
- severity
- file
- line
- description
- recommendation

Return JSON.

{
  "complexity_score": float,
  "code_smells":[]
}
"""