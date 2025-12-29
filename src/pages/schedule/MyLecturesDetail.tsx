import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { User, ArrowLeft, Calendar, ChevronDown, ChevronUp } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table'

interface Instructor {
  name: string
  isSelf: boolean
}

// Mock detail data - in a real app, this would be fetched based on the ID
const getDetailData = (_classId: string) => {
  // This would typically be an API call
  return {
    educationId: '16880',
    status: '강사 공개',
    name: '테스트_1224',
    description: '테스트_1224',
    startDate: '2025-12-25',
    endDate: '2025-12-27',
    grade: '2',
    class: '6',
    studentCount: 22,
    remarks: '-',
    programId: '431',
    programName: '테스트_1224',
    institutionId: '518',
    affiliationName: '경기미래채움',
    institutionName: '테스트_1224_북부',
    address: '경기도 의정부시 --',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    equipment: {
      pc: '-',
      laptop: '-',
      tablet: '-',
      chromebook: '-',
    },
    classes: [
      {
        id: '1',
        date: '2025-12-27',
        startTime: '15:00',
        endTime: '08:00',
        session: '1차시 수업',
        sessionStartTime: '15:00',
        sessionEndTime: '08:00',
        classId: '102830',
        status: '1차 확정',
        mainInstructorCount: 1,
        assistantInstructorCount: 0,
        mainInstructors: [
          {
            name: '김철수(일반, 북부-테스트계정)',
            isSelf: true,
          },
        ] as Instructor[],
        assistantInstructors: [] as Instructor[],
      },
    ],
  }
}

export function MyLecturesDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const data = id ? getDetailData(id) : null
  const [expandedSessions, setExpandedSessions] = useState<Set<string>>(new Set())

  const toggleSession = (sessionId: string) => {
    setExpandedSessions(prev => {
      const newSet = new Set(prev)
      if (newSet.has(sessionId)) {
        newSet.delete(sessionId)
      } else {
        newSet.add(sessionId)
      }
      return newSet
    })
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500 dark:text-gray-400">데이터를 찾을 수 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <nav className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            홈 - 출강 일정 - 내 출강 리스트
          </nav>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            내 출강 리스트
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {/* ① 교육 조회 */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">① 교육 조회</h2>

        {/* 교육 정보 */}
        <div className="border border-gray-200 dark:border-gray-900 rounded-xl bg-white dark:bg-black overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-900">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">교육 정보</h3>
          </div>
          <div className="p-4">
            <Table>
              <TableBody>
                <TableRow className="hover:bg-transparent dark:hover:bg-transparent border-b border-gray-200 dark:border-gray-800">
                  <TableCell className="font-bold text-gray-700 dark:text-gray-300 w-1/6 !p-3 border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">교육 ID</TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100 !p-3 border-r border-gray-200 dark:border-gray-800">{data.educationId}</TableCell>
                  <TableCell className="font-bold text-gray-700 dark:text-gray-300 w-1/6 !p-3 border-l border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">상태</TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100 !p-3">{data.status}</TableCell>
                </TableRow>
                <TableRow className="hover:bg-transparent dark:hover:bg-transparent border-b border-gray-200 dark:border-gray-800">
                  <TableCell className="font-bold text-gray-700 dark:text-gray-300 !p-3 border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">교육명</TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100 !p-3 border-r border-gray-200 dark:border-gray-800">{data.name}</TableCell>
                  <TableCell className="font-bold text-gray-700 dark:text-gray-300 !p-3 border-l border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">설명</TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100 !p-3">{data.description}</TableCell>
                </TableRow>
                <TableRow className="hover:bg-transparent dark:hover:bg-transparent border-b border-gray-200 dark:border-gray-800">
                  <TableCell className="font-bold text-gray-700 dark:text-gray-300 !p-3 border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">시작일</TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100 !p-3 border-r border-gray-200 dark:border-gray-800">{data.startDate}</TableCell>
                  <TableCell className="font-bold text-gray-700 dark:text-gray-300 !p-3 border-l border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">종료일</TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100 !p-3">{data.endDate}</TableCell>
                </TableRow>
                <TableRow className="hover:bg-transparent dark:hover:bg-transparent border-b border-gray-200 dark:border-gray-800">
                  <TableCell className="font-bold text-gray-700 dark:text-gray-300 !p-3 border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">학년</TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100 !p-3 border-r border-gray-200 dark:border-gray-800">{data.grade}</TableCell>
                  <TableCell className="font-bold text-gray-700 dark:text-gray-300 !p-3 border-l border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">반</TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100 !p-3">{data.class}</TableCell>
                </TableRow>
                <TableRow className="hover:bg-transparent dark:hover:bg-transparent border-0">
                  <TableCell className="font-bold text-gray-700 dark:text-gray-300 !p-3 border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">학생 수</TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100 !p-3 border-r border-gray-200 dark:border-gray-800">{data.studentCount}</TableCell>
                  <TableCell className="font-bold text-gray-700 dark:text-gray-300 !p-3 border-l border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">비고</TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100 !p-3">{data.remarks}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        {/* 프로그램 정보 */}
        <div className="border border-gray-200 dark:border-gray-900 rounded-xl bg-white dark:bg-black overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-900">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">프로그램 정보</h3>
          </div>
          <div className="p-4">
            <Table>
              <TableBody>
                <TableRow className="hover:bg-transparent dark:hover:bg-transparent border-0">
                  <TableCell className="font-bold text-gray-700 dark:text-gray-300 w-1/6 !p-3 border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">프로그램 ID</TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100 !p-3 border-r border-gray-200 dark:border-gray-800 w-1/3">{data.programId}</TableCell>
                  <TableCell className="font-bold text-gray-700 dark:text-gray-300 w-1/6 !p-3 border-l border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">프로그램명</TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100 !p-3">{data.programName}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        {/* 기관 정보 */}
        <div className="border border-gray-200 dark:border-gray-900 rounded-xl bg-white dark:bg-black overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-900">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">기관 정보</h3>
          </div>
          <div className="p-4">
            <Table>
              <TableBody>
                <TableRow className="hover:bg-transparent dark:hover:bg-transparent border-b border-gray-200 dark:border-gray-800">
                  <TableCell className="font-bold text-gray-700 dark:text-gray-300 w-1/6 !p-3 border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">교육기관 ID</TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100 !p-3 border-r border-gray-200 dark:border-gray-800 w-1/3">{data.institutionId}</TableCell>
                  <TableCell className="font-bold text-gray-700 dark:text-gray-300 w-1/6 !p-3 border-l border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">소속명</TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100 !p-3">{data.affiliationName}</TableCell>
                </TableRow>
                <TableRow className="hover:bg-transparent dark:hover:bg-transparent border-b border-gray-200 dark:border-gray-800">
                  <TableCell className="font-bold text-gray-700 dark:text-gray-300 w-1/6 !p-3 border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">교육기관명</TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100 !p-3 border-r border-gray-200 dark:border-gray-800 w-1/3">{data.institutionName}</TableCell>
                  <TableCell className="font-bold text-gray-700 dark:text-gray-300 w-1/6 !p-3 border-l border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">주소</TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100 !p-3">{data.address}</TableCell>
                </TableRow>
                <TableRow className="hover:bg-transparent dark:hover:bg-transparent border-b border-gray-200 dark:border-gray-800">
                  <TableCell className="font-bold text-gray-700 dark:text-gray-300 w-1/6 !p-3 border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">담당자 이름</TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100 !p-3 border-r border-gray-200 dark:border-gray-800 w-1/3">{data.contactName || '-'}</TableCell>
                  <TableCell className="font-bold text-gray-700 dark:text-gray-300 w-1/6 !p-3 border-l border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">담당자 핸드폰번호</TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100 !p-3">{data.contactPhone || '-'}</TableCell>
                </TableRow>
                <TableRow className="hover:bg-transparent dark:hover:bg-transparent border-0">
                  <TableCell className="font-bold text-gray-700 dark:text-gray-300 w-1/6 !p-3 border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">담당자 이메일</TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100 !p-3 border-r border-gray-200 dark:border-gray-800 w-1/3">{data.contactEmail || '-'}</TableCell>
                  <TableCell className="!p-3"></TableCell>
                  <TableCell className="!p-3"></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        {/* 기관 보유 장비 현황 */}
        <div className="border border-gray-200 dark:border-gray-900 rounded-xl bg-white dark:bg-black overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-900">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">기관 보유 장비 현황</h3>
          </div>
          <div className="p-4">
            <Table>
              <TableBody>
                <TableRow className="hover:bg-transparent dark:hover:bg-transparent border-b border-gray-200 dark:border-gray-800">
                  <TableCell className="font-bold text-gray-700 dark:text-gray-300 w-1/6 !p-3 border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">PC</TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100 !p-3 border-r border-gray-200 dark:border-gray-800">{data.equipment.pc}</TableCell>
                  <TableCell className="font-bold text-gray-700 dark:text-gray-300 w-1/6 !p-3 border-l border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">노트북</TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100 !p-3">{data.equipment.laptop}</TableCell>
                </TableRow>
                <TableRow className="hover:bg-transparent dark:hover:bg-transparent border-0">
                  <TableCell className="font-bold text-gray-700 dark:text-gray-300 !p-3 border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">태블릿</TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100 !p-3 border-r border-gray-200 dark:border-gray-800">{data.equipment.tablet}</TableCell>
                  <TableCell className="font-bold text-gray-700 dark:text-gray-300 !p-3 border-l border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">크롬북</TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100 !p-3">{data.equipment.chromebook}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        {/* 수업 정보 */}
        <div className="border border-gray-200 dark:border-gray-900 rounded-xl bg-white dark:bg-black overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-900">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">수업 정보</h3>
          </div>
          <div className="p-4 space-y-3">
            {data.classes.map((classItem) => (
              <div key={classItem.id} className="space-y-2">
                {/* Date container */}
                <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-900 dark:text-gray-100">
                    {classItem.date} ({classItem.startTime} ~ {classItem.endTime})
                  </span>
                </div>
                {/* Session container */}
                <div className="ml-8">
                  <button
                    onClick={() => toggleSession(classItem.id)}
                    className="w-full flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                  >
                    <span className="text-gray-900 dark:text-gray-100 font-medium">
                      {classItem.session} ({classItem.sessionStartTime} ~ {classItem.sessionEndTime})
                    </span>
                    {expandedSessions.has(classItem.id) ? (
                      <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    )}
                  </button>
                  {expandedSessions.has(classItem.id) && (
                    <div className="mt-2 ml-0 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 overflow-hidden">
                      <Table>
                        <TableBody>
                          <TableRow className="hover:bg-transparent dark:hover:bg-transparent border-b border-gray-200 dark:border-gray-800">
                            <TableCell className="font-bold text-gray-700 dark:text-gray-300 !p-3 border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">수업 ID</TableCell>
                            <TableCell className="text-gray-900 dark:text-gray-100 !p-3 border-r border-gray-200 dark:border-gray-800">{classItem.classId}</TableCell>
                            <TableCell className="font-bold text-gray-700 dark:text-gray-300 !p-3 border-l border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">날짜</TableCell>
                            <TableCell className="text-gray-900 dark:text-gray-100 !p-3">{classItem.date}</TableCell>
                          </TableRow>
                          <TableRow className="hover:bg-transparent dark:hover:bg-transparent border-b border-gray-200 dark:border-gray-800">
                            <TableCell className="font-bold text-gray-700 dark:text-gray-300 !p-3 border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">시작 시간</TableCell>
                            <TableCell className="text-gray-900 dark:text-gray-100 !p-3 border-r border-gray-200 dark:border-gray-800">{classItem.sessionStartTime}</TableCell>
                            <TableCell className="font-bold text-gray-700 dark:text-gray-300 !p-3 border-l border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">종료 시간</TableCell>
                            <TableCell className="text-gray-900 dark:text-gray-100 !p-3">{classItem.sessionEndTime}</TableCell>
                          </TableRow>
                          <TableRow className="hover:bg-transparent dark:hover:bg-transparent border-b border-gray-200 dark:border-gray-800">
                            <TableCell className="font-bold text-gray-700 dark:text-gray-300 !p-3 border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">수업 상태</TableCell>
                            <TableCell className="text-gray-900 dark:text-gray-100 !p-3 border-r border-gray-200 dark:border-gray-800">{classItem.status}</TableCell>
                            <TableCell className="font-bold text-gray-700 dark:text-gray-300 !p-3 border-l border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">주강사 수</TableCell>
                            <TableCell className="text-gray-900 dark:text-gray-100 !p-3">{classItem.mainInstructorCount}</TableCell>
                          </TableRow>
                          <TableRow className="hover:bg-transparent dark:hover:bg-transparent border-0">
                            <TableCell className="font-bold text-gray-700 dark:text-gray-300 !p-3 border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">보조강사 수</TableCell>
                            <TableCell className="text-gray-900 dark:text-gray-100 !p-3 border-r border-gray-200 dark:border-gray-800">{classItem.assistantInstructorCount}</TableCell>
                            <TableCell className="!p-3"></TableCell>
                            <TableCell className="!p-3"></TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  )}
                  
                  {/* 주강사 정보 */}
                  {expandedSessions.has(classItem.id) && (
                    <div className="mt-3 ml-0 space-y-3">
                      <div className="border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 overflow-hidden">
                        <div className="p-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
                          <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100">주강사 정보</h4>
                        </div>
                        <div className="p-3">
                          {classItem.mainInstructors && classItem.mainInstructors.length > 0 ? (
                            <div className="space-y-2">
                              {classItem.mainInstructors.map((instructor, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <span className="text-gray-900 dark:text-gray-100">{instructor.name}</span>
                                  {instructor.isSelf && (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium">
                                      본인
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <span className="text-gray-500 dark:text-gray-400">-</span>
                          )}
                        </div>
                      </div>
                      
                      {/* 보조강사 정보 */}
                      <div className="border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 overflow-hidden">
                        <div className="p-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
                          <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100">보조강사 정보</h4>
                        </div>
                        <div className="p-3">
                          {classItem.assistantInstructors && classItem.assistantInstructors.length > 0 ? (
                            <div className="space-y-2">
                              {classItem.assistantInstructors.map((instructor, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <span className="text-gray-900 dark:text-gray-100">{instructor.name}</span>
                                  {instructor.isSelf && (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium">
                                      본인
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <span className="text-gray-500 dark:text-gray-400">-</span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="flex justify-end">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          뒤로
        </button>
      </div>
    </div>
  )
}

