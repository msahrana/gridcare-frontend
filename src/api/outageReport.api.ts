import {
    ICreateOutageReport,
    IOutageReportResponse,
    IUpdateOutageReport,
    OutageReportsParams,
    SingleOutageReportResponse,
} from '@/interface';
import apiClient from '@/lib/apiClient';

export function createOutageReport(payload: ICreateOutageReport) {
    return apiClient<SingleOutageReportResponse>('/outageReports', {
        method: 'POST',
        body: payload,
    });
}

export function getAllOutageReports(params: OutageReportsParams) {
    return apiClient<IOutageReportResponse>('/outageReports', { params });
}

export function updateOutageReport(
    id: string,
    payload: Omit<IUpdateOutageReport, 'id'>,
) {
    return apiClient<SingleOutageReportResponse>(`/outageReports/${id}`, {
        method: 'PATCH',
        body: payload,
    });
}

export function deleteOutageReport(id: string) {
    return apiClient<SingleOutageReportResponse>(`/outageReports/${id}`, {
        method: 'DELETE',
    });
}
