import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar-l";
import { addQuestion, leafletMapContext, questions } from "../lib/context";
import { useStore } from "@nanostores/react";
import {
    MatchingQuestionComponent,
    MeasuringQuestionComponent,
    RadiusQuestionComponent,
    TentacleQuestionComponent,
    ThermometerQuestionComponent,
} from "./QuestionCards";
import * as turf from "@turf/turf";

export const QuestionSidebar = () => {
    const $questions = useStore(questions);

    return (
        <Sidebar>
            <h2 className="ml-4 mt-4 font-poppins text-2xl">Questions</h2>
            <SidebarContent>
                {$questions.map((question, index) => {
                    switch (question.id) {
                        case "radius":
                            return (
                                <RadiusQuestionComponent
                                    data={question.data}
                                    key={question.key}
                                    questionKey={question.key}
                                    index={index}
                                />
                            );
                        case "thermometer":
                            return (
                                <ThermometerQuestionComponent
                                    data={question.data}
                                    key={question.key}
                                    questionKey={question.key}
                                    index={index}
                                />
                            );
                        case "tentacles":
                            return (
                                <TentacleQuestionComponent
                                    data={question.data}
                                    key={question.key}
                                    questionKey={question.key}
                                    index={index}
                                />
                            );
                        case "matching":
                            return (
                                <MatchingQuestionComponent
                                    data={question.data}
                                    key={question.key}
                                    questionKey={question.key}
                                    index={index}
                                />
                            );
                        case "measuring":
                            return (
                                <MeasuringQuestionComponent
                                    data={question.data}
                                    key={question.key}
                                    questionKey={question.key}
                                    index={index}
                                />
                            );
                        default:
                            return null;
                    }
                })}
            </SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>Add Question</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                onClick={() => {
                                    const map = leafletMapContext.get();
                                    if (!map) return;

                                    const center = map.getCenter();

                                    addQuestion({
                                        id: "radius",
                                        data: {
                                            lat: center.lat,
                                            lng: center.lng,
                                        },
                                    });
                                }}
                            >
                                Add Radius
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                onClick={() => {
                                    const map = leafletMapContext.get();
                                    if (!map) return;

                                    const center = map.getCenter();

                                    const destination = turf.destination(
                                        [center.lng, center.lat],
                                        5,
                                        90,
                                        {
                                            units: "miles",
                                        },
                                    );

                                    addQuestion({
                                        id: "thermometer",
                                        data: {
                                            latA: center.lat,
                                            lngB: center.lng,
                                            latB: destination.geometry
                                                .coordinates[1],
                                            lngA: destination.geometry
                                                .coordinates[0],
                                        },
                                    });
                                }}
                            >
                                Add Thermometer
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                onClick={() => {
                                    const map = leafletMapContext.get();
                                    if (!map) return;

                                    const center = map.getCenter();

                                    addQuestion({
                                        id: "tentacles",
                                        data: {
                                            lat: center.lat,
                                            lng: center.lng,
                                        },
                                    });
                                }}
                            >
                                Add Tentacles
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                onClick={() => {
                                    const map = leafletMapContext.get();
                                    if (!map) return;

                                    const center = map.getCenter();

                                    addQuestion({
                                        id: "matching",
                                        data: {
                                            lat: center.lat,
                                            lng: center.lng,
                                            cat: {},
                                        },
                                    });
                                }}
                            >
                                Add Matching
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                onClick={() => {
                                    const map = leafletMapContext.get();
                                    if (!map) return;

                                    const center = map.getCenter();

                                    addQuestion({
                                        id: "measuring",
                                        data: {
                                            lat: center.lat,
                                            lng: center.lng,
                                        },
                                    });
                                }}
                            >
                                Add Measuring
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </Sidebar>
    );
};
