import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { CheckCircle, Star } from "lucide-react"

export default function Usage() {
    const steps = [
        "Copy API Endpoint from Postman",
        "Paste API Route into TSGen",
        "Copy API Body from Postman",
        "Input JSON Data into TSGen",
        "Select API Response Type",
        "Generate TypeScript Interface"
    ]

    return (
        <div className="max-w-4xl mx-auto space-y-8 p-6 text-left">
            <Card className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">TSGen</CardTitle>
                    <CardDescription className="text-purple-100">
                        TypeScript Interface Generator for Faster API Development
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-lg">
                        Save 10-15 minutes per API by automatically generating TypeScript interfaces.
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">How to Use TSGen</CardTitle>
                    <CardDescription>
                        Follow these simple steps to generate TypeScript interfaces for your API
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {steps.map((step, index) => (
                            <li key={index} className="flex items-start">
                                <CheckCircle className="mr-2 h-6 w-6 text-green-500 flex-shrink-0" />
                                <span>{step}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            <Alert className="bg-blue-50 border-blue-200">
                <AlertDescription className="text-blue-800">
                    TSGen automates the process of creating TypeScript interfaces, significantly reducing development time and potential errors.
                </AlertDescription>
            </Alert>

            <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                <CardContent className="flex flex-col md:flex-row items-center justify-between p-4 md:p-6 space-y-4 md:space-y-0">
                    <div className="space-y-1 md:space-y-2 text-center md:text-left">
                        <h3 className="text-xl md:text-2xl font-semibold">Enjoying TSGen?</h3>
                        <p className="text-sm md:text-base">Support us by starring the project on GitHub!</p>
                    </div>
                    <Button
                        variant="secondary"
                        size="lg"
                        className="bg-white text-orange-500 hover:bg-orange-100 w-full md:w-auto"
                        onClick={() => window.open('https://github.com/AmanKadam-16/TimeSavers', '_blank')}
                    >
                        <Star className="mr-2 h-4 w-4" />
                        Star on GitHub
                    </Button>
                </CardContent>
            </Card>

        </div>
    )
}