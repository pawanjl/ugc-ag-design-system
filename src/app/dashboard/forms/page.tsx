"use client";

import { useState } from "react";
import { Search, Mail } from "lucide-react";

import { AnimatedTextInput } from "@/components/forms/AnimatedTextInput";
import { AnimatedTextarea } from "@/components/forms/AnimatedTextarea";
import { AnimatedSelect } from "@/components/forms/AnimatedSelect";
import { AnimatedCheckboxGroup } from "@/components/forms/AnimatedCheckboxGroup";
import { AnimatedRadioGroup } from "@/components/forms/AnimatedRadioGroup";
import { AnimatedSlider } from "@/components/forms/AnimatedSlider";
import { AnimatedFileUpload } from "@/components/forms/AnimatedFileUpload";
import { AnimatedQRCode } from "@/components/forms/AnimatedQRCode";
import { FormsStepper } from "@/components/forms/FormsStepper";
import { CurrencyInput } from "@/components/forms/CurrencyInput";
import { RichTextEditor } from "@/components/forms/RichTextEditor";
import { AnimatedDatePicker } from "@/components/forms/AnimatedDatePicker";
import { Button } from "@/components/ui/button";

export default function FormsShowcasePage() {
  const [textValue, setTextValue] = useState("");
  const [selectValue, setSelectValue] = useState<string>();
  const [checkboxValues, setCheckboxValues] = useState<string[]>([]);
  const [radioValue, setRadioValue] = useState<string>();
  const [sliderValue, setSliderValue] = useState([50]);
  const [dateValue, setDateValue] = useState<Date>();
  const [currencyValue, setCurrencyValue] = useState<number | null>(null);
  const [richText, setRichText] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [qrValue, setQrValue] = useState("https://elevenlabs.io");

  return (
    <div className="flex-1 space-y-8 p-8 pt-6 max-w-[1400px] mx-auto w-full">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Form Components</h2>
        <div className="flex items-center space-x-2">
          <Button>Submit Example</Button>
        </div>
      </div>

      <div className="mb-10 p-6 border rounded-xl bg-card text-card-foreground">
        <h3 className="text-xl font-semibold mb-2 text-foreground">Interactive Stepper Component</h3>
        <FormsStepper 
          steps={[
            { title: "Account Details", description: "Set up login info" },
            { title: "Personal Info", description: "Tell us about you" },
            { title: "Preferences", description: "Customize experience" },
            { title: "Review", description: "Check all details" }
          ]}
          currentStep={currentStep}
          onStepClick={(step) => setCurrentStep(step)}
        />
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0}>Back</Button>
          <Button onClick={() => setCurrentStep(Math.min(3, currentStep + 1))} disabled={currentStep === 3}>Next</Button>
        </div>
      </div>

      <div className="grid gap-8 grid-cols-1 xl:grid-cols-2">
        <section className="space-y-6">
          <div className="border-b pb-4">
            <h3 className="text-xl font-semibold tracking-tight">Standard Inputs</h3>
            <p className="text-sm text-muted-foreground">Basic text inputs, textareas, and specialized fields.</p>
          </div>
          <div className="grid gap-6 p-6 border rounded-xl bg-card">
            <AnimatedTextInput
              label="Email Address"
              description="We'll never share your email with anyone else."
              placeholder="name@example.com"
              leftIcon={<Mail className="h-4 w-4" />}
            />
            <AnimatedTextInput
              label="Username"
              error={textValue.length > 0 && textValue.length < 3 ? "Username must be at least 3 characters" : undefined}
              placeholder="johndoe"
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              rightIcon={<Search className="h-4 w-4" />}
            />
            <CurrencyInput
              label="Investment Amount"
              description="Enter the amount you wish to invest."
            />
            <AnimatedTextarea
              label="Biography"
              placeholder="Tell us a little bit about yourself..."
              description="You can write up to 500 characters."
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="border-b pb-4">
            <h3 className="text-xl font-semibold tracking-tight">Selection & Pickers</h3>
            <p className="text-sm text-muted-foreground">Select menus, date pickers, and sliders.</p>
          </div>
          <div className="grid gap-6 p-6 border rounded-xl bg-card">
            <AnimatedSelect
              label="Favorite Framework"
              options={[
                { label: "React", value: "react" },
                { label: "Vue", value: "vue" },
                { label: "Svelte", value: "svelte" },
                { label: "Angular", value: "angular" },
              ]}
              value={selectValue}
              onValueChange={setSelectValue}
            />
            <AnimatedDatePicker
              label="Date of Birth"
              description="Your date of birth is used to calculate your age."
              date={dateValue}
              onDateChange={setDateValue}
            />
            <AnimatedSlider
              label="Volume Level"
              description="Adjust the volume of the audio output."
              value={sliderValue}
              onValueChange={setSliderValue}
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="border-b pb-4">
            <h3 className="text-xl font-semibold tracking-tight">Toggles & Checks</h3>
            <p className="text-sm text-muted-foreground">Switches, checkboxes, and radio button groups.</p>
          </div>
          <div className="grid gap-6 p-6 border rounded-xl bg-card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatedCheckboxGroup
                label="Notifications"
                description="Select how you want to be notified."
                options={[
                  { id: "email", label: "Email" },
                  { id: "sms", label: "SMS" },
                  { id: "push", label: "Push Notifications" },
                ]}
                selectedValues={checkboxValues}
                onValuesChange={setCheckboxValues}
              />
              <AnimatedRadioGroup
                label="Theme Preference"
                description="Select your preferred theme."
                options={[
                  { id: "light", label: "Light" },
                  { id: "dark", label: "Dark" },
                  { id: "system", label: "System" },
                ]}
                value={radioValue}
                onValueChange={setRadioValue}
              />
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="border-b pb-4">
            <h3 className="text-xl font-semibold tracking-tight">Advanced Inputs</h3>
            <p className="text-sm text-muted-foreground">File uploads, rich text, and QR generation.</p>
          </div>
          <div className="grid gap-6 p-6 border rounded-xl bg-card">
            <AnimatedFileUpload
              label="Profile Picture"
              maxSizeMB={2}
              onFileSelect={(file) => console.log("Selected:", file)}
            />
            <div className="flex flex-col gap-4">
              <AnimatedTextInput
                label="QR Code Generator URL"
                value={qrValue}
                onChange={(e) => setQrValue(e.target.value)}
              />
              <AnimatedQRCode
                value={qrValue}
                size={140}
              />
            </div>
          </div>
        </section>
        
        <section className="space-y-6 xl:col-span-2">
          <div className="border-b pb-4">
            <h3 className="text-xl font-semibold tracking-tight">Rich Editor</h3>
            <p className="text-sm text-muted-foreground">Advanced text editor with rich formatting.</p>
          </div>
          <div className="grid gap-6 p-6 border rounded-xl bg-card">
            <RichTextEditor
              label="Blog Post Content"
              description="Write your blog post here using rich formatting."
              value={richText}
              onChange={setRichText}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
