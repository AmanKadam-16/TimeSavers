import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clipboard, Check, Github } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import MarkdownPreview from '@uiw/react-markdown-preview';
import Mention from './Mention';

const InterfaceGenerator = () => {
  const [apiRoute, setApiRoute] = useState('');
  const [inputJson, setInputJson] = useState('');
  const [outputJson, setOutputJson] = useState('');
  const [responseType, setResponseType] = useState('string');
  const [markdownOutput, setMarkdownOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const generateInterfaceName = (route: any) => {
    if (!route) return '';
    const parts = route.split('/');
    return parts[parts.length - 1];
  };

  const generateTypeScript = (obj: any, isArray = false) => {
    const properties = Object.entries(obj).map(([key, value]) => {
      const type = typeof value;
      let typeStr = 'any';

      if (type === 'string') typeStr = 'string';
      else if (type === 'number') typeStr = 'number';
      else if (type === 'boolean') typeStr = 'boolean';
      else if (Array.isArray(value)) {
        if (value.length > 0) {
          typeStr = `${generateTypeScript(value[0])}[]`;
        } else {
          typeStr = 'any[]';
        }
      } else if (type === 'object' && value !== null) {
        typeStr = generateTypeScript(value);
      }

      return `  ${key}: ${typeStr}`;
    }).join('\n');

    return isArray ? `{\n${properties}\n}` : `{\n${properties}\n}`;
  };

  const generateCode = () => {
    try {
      setError('');
      const endpointName = generateInterfaceName(apiRoute);
      let markdownText = `# Interface Generated for ${apiRoute}\n\n`;
      let interfaces = '';
      let apiFunction = '';

      // Input Interface
      if (inputJson) {
        const inputData = JSON.parse(inputJson);
        interfaces += `export interface I${endpointName}Body ${generateTypeScript(inputData)}\n\n`;
      }

      // Output Interface based on response type
      if (responseType === 'json' && outputJson) {
        const outputData = JSON.parse(outputJson);
        const isArray = Array.isArray(outputData);
        if (isArray) {
          interfaces += `export interface I${endpointName}Result ${generateTypeScript(outputData[0])}\n\n`;
        } else {
          interfaces += `export interface I${endpointName}Result ${generateTypeScript(outputData)}\n\n`;
        }
      }

      // API Function with appropriate return type
      const returnType = (() => {
        switch (responseType) {
          case 'json':
            return `I${endpointName}Result${Array.isArray(JSON.parse(outputJson)) ? '[]' : ''}`;
          case 'boolean':
            return 'boolean';
          case 'number':
            return 'number';
          case 'void':
            return 'void';
          default:
            return 'string';
        }
      })();

      apiFunction = `const ${endpointName}api = (data: I${endpointName}Body) => {\n`;
      apiFunction += `  return http.post<${returnType}>(\n    '${apiRoute}',\n    data\n  );\n};`;

      markdownText += `## Interfaces\n\`\`\`typescript\n${interfaces}\`\`\`\n\n`;
      markdownText += `## API Function\n\`\`\`typescript\n${apiFunction}`;

      setMarkdownOutput(markdownText);
    } catch (err) {
      setError('Invalid JSON format. Please check your input.');
    }
  };

  const copyToClipboard = () => {
    const textToCopy = markdownOutput.replace(/```typescript|```/g, '').replace(/^#.*$/gm, '').trim();
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="w-full max-w-4xl mx-auto px-1 mt-12 space-y-4">
        <Card >
          <CardHeader className="text-left pb-4">
            <CardTitle className="text-lg sm:text-2xl md:text-2xl lg:text-3xl font-bold tracking-tight">
              TypeScript Interface Generator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-left">
            <div>
              <Label>API Route</Label>
              <Input
                placeholder="e.g., Teacher/DeletePersonalAddressBook"
                value={apiRoute}
                onChange={(e) => setApiRoute(e.target.value)}
              />
            </div>

            <div>
              <Label>Input JSON</Label>
              <textarea
                className="w-full h-32 p-2 border rounded-md"
                placeholder="Paste your input JSON here"
                value={inputJson}
                onChange={(e) => setInputJson(e.target.value)}
              />
            </div>

            <div>
              <Label>Response Type</Label>
              <Select value={responseType} onValueChange={setResponseType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="string">String</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="boolean">Boolean</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="void">Void</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {responseType === 'json' && (
              <div>
                <Label>Output JSON</Label>
                <textarea
                  className="w-full h-32 p-2 border rounded-md"
                  placeholder="Paste your output JSON here"
                  value={outputJson}
                  onChange={(e) => setOutputJson(e.target.value)}
                />
              </div>
            )}

            <Button onClick={generateCode} className="w-full">
              Generate Interface
            </Button>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {markdownOutput && (
              <div className="relative">
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-2 right-2 z-10"
                  onClick={copyToClipboard}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                </Button>
                <div className="border rounded-lg p-4" style={{ textAlign: 'left' }}>
                  <MarkdownPreview source={markdownOutput} />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default InterfaceGenerator;