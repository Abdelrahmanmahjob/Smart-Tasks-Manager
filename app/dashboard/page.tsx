import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../(ui)/Card"
import Button from "../(ui)/Button"

export default function DashboardPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>
          Quick summary of your tasks and projects.
        </CardDescription>
      </CardHeader>

      <CardContent>هنا تضع أي محتوى (إحصائيات، قائمة مهام، إلخ)</CardContent>

      <CardFooter>
        <Button size="sm">View details</Button>
      </CardFooter>
    </Card>
  )
}
